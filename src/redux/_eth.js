import { takeEvery, put, call, take, fork } from "redux-saga/effects";
import { eventChannel, delay } from "redux-saga";
import Web3 from "web3";
import update from "immutability-helper";
import createAction from "./_createAction";
import EthUtils from "../utils/EthUtils";

// -- Constants --------------------------------------------------------------- //

const SUBSCRIBE_TO_ETH_BLOCKS = "SUBSCRIBE_TO_ETH_BLOCKS";
const RECORD_FETCHED_ETH_BLOCKS = "RECORD_FETCHED_ETH_BLOCKS";

// -- Actions --------------------------------------------------------------- //

export const subscribeToEthBlocks = () => createAction(SUBSCRIBE_TO_ETH_BLOCKS);
const recordFetchedBlocks = blocks =>
  createAction(RECORD_FETCHED_ETH_BLOCKS, { blocks });

// -- Sagas --------------------------------------------------------------- //

function* handleWeb3Event(event) {
  console.log("Received Web3 Event");

  // Fetch Transaction count for the block. If the count is not immediately available, retry a few times.
  let txCount = yield call(EthUtils.getTxCountForBlock, event.number);
  const maxRetries = 10;
  for (let i = 0; i < maxRetries && txCount === null; i += 1) {
    yield call(delay, 1000);
    txCount = yield call(EthUtils.getTxCountForBlock, event.number);
  }

  if (txCount === null) {
    console.error("Got null txCount");
    txCount = 0;
  }

  const block = {
    number: event.number,
    minedAt: event.timestamp * 1000,
    hash: event.hash,
    txHashes: [],
    txCount
  };

  yield put(recordFetchedBlocks({ [block.hash]: block }));
}

// Connect web3's event emitter to redux-saga's emitter.
function createEventChannelForWeb3Changes() {
  const network = EthUtils.getNetwork();
  const url =
    network === "mainnet"
      ? `wss://${network}.infura.io/_ws/wxolU88UXbw7sTfEFgK2`
      : `wss://${network}.infura.io/ws/wxolU88UXbw7sTfEFgK2`;
  const web3Subscriber = new Web3(new Web3.providers.WebsocketProvider(url));

  return eventChannel(emitter => {
    const blockHeaderSubscription = web3Subscriber.eth.subscribe(
      "newBlockHeaders",
      (error, result) => {
        if (error) {
          console.error(error);
          emitter({ type: "error", error });
        }

        emitter({ type: "result", result });
      }
    );

    // The subscriber must return an unsubscribe function
    return () => {
      blockHeaderSubscription.unsubscribe();
    };
  });
}

// Process the web3 event channel and update assets in response to remote changes.
function* subscribeToRemoteUpdates() {
  try {
    const chan = yield call(createEventChannelForWeb3Changes);
    while (true) {
      const emittedEvent = yield take(chan);
      switch (emittedEvent.type) {
        case "error":
          console.error(emittedEvent.error);
          break;
        case "result":
          yield call(handleWeb3Event, emittedEvent.result);
          break;
        default:
          console.error("unexpected emitted event");
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.info("Subscription done");
  }
}

function* fetchEthBlocksSaga() {
  yield takeEvery(SUBSCRIBE_TO_ETH_BLOCKS, function* handler(action) {
    try {
      console.log("SUBSCRIBE TO ETH BLOCKS SAGA", action);
      yield fork(subscribeToRemoteUpdates);
    } catch (e) {
      console.error(e);
    }
  });
}

export const runEthSagas = sagaMiddleware => {
  sagaMiddleware.run(fetchEthBlocksSaga);
};

// -- Reducer --------------------------------------------------------------- //

export const ETH_INITIAL_STATE = {
  blocks: {},
  txCountSinceVisiting: 0
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case RECORD_FETCHED_ETH_BLOCKS:
      return update(state, {
        blocks: { $merge: payload.blocks },
        txCountSinceVisiting: count =>
          count +
          Object.values(payload.blocks).reduce(
            (total, b) => total + b.txCount,
            0
          )
      });
    default:
      return state;
  }
};

export default (state = ETH_INITIAL_STATE, action) => {
  const newState = reducer(state, action);
  return newState;
};
