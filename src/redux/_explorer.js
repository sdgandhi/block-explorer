import { takeEvery, put, call, select } from "redux-saga/effects";
import Elph from "elph-sdk";
import update from "immutability-helper";
import createAction from "./_createAction";
import { lastFetchedBlockNumberSelector } from "./selectors";

const elph = new Elph("http://localhost:5000/rpc");

// -- Constants --------------------------------------------------------------- //

export const FETCH_LATEST_BLOCKS = "FETCH_LATEST_BLOCKS";
export const FETCHED_LATEST_BLOCKS = "FETCHED_LATEST_BLOCKS";

// -- Actions --------------------------------------------------------------- //

export const fetchLatestBlocks = () => createAction(FETCH_LATEST_BLOCKS);
export const fetchedLatestBlocks = (blocks, latestBlockNumber) =>
  createAction(FETCHED_LATEST_BLOCKS, { blocks, latestBlockNumber });

// -- Sagas --------------------------------------------------------------- //

function* fetchLatestBlocksSaga() {
  yield takeEvery(FETCH_LATEST_BLOCKS, function* handler(action) {
    console.log("FETCHING LATEST BLOCK SAGA", action);
    const lastFetchedBlockNumber = yield select(lastFetchedBlockNumberSelector);

    const blocksList = yield call(elph.getBlocks, lastFetchedBlockNumber);
    const blocks = {};
    blocksList.forEach(block => {
      blocks[block.number] = { ...block, minedAt: Date.now() };
    });

    const latestBlockNumber = Math.max(
      lastFetchedBlockNumber,
      ...Object.keys(blocks)
    );

    yield put(fetchedLatestBlocks(blocks, latestBlockNumber));
  });
}

export const runExplorerSagas = sagaMiddleware => {
  sagaMiddleware.run(fetchLatestBlocksSaga);
};

// -- Reducer --------------------------------------------------------------- //

const createTx = (slot, denomination, prevBlockNumber, spent) => ({
  slot,
  denomination,
  prevBlockNumber,
  spent,
  blockNumber: prevBlockNumber + 1,
  hash: `0x${slot}c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f`,
  signature:
    "0x00552bbcf4ddecea0aba93edacb85bdd182d4fac69c2aa5f861d15f03d23ed7b947829234a73e833bbcc49eb0fdc8dcdc29a3f7fa3cb0d5067cd9956312811081801",
  newOwner: "0x88fc071f55aa16f4a26d887204f6fa6c22dbcfe9"
});

const createBlock = (number, txns) => ({
  number,
  txns,
  minedAt: Date.now(),
  hash: `0x${number}dbc65a949f02444f0fe2997510489874ee7c34da55e45f27d167e374dc6`,
  signature:
    "0x00552bbcf4ddecea0aba93edacb85bdd182d4fac69c2aa5f861d15f03d23ed7b947829234a73e833bbcc49eb0fdc8dcdc29a3f7fa3cb0d5067cd9956312811081801"
});

export const EXPLORER_INITIAL_STATE = {
  lastFetchedBlockNumber: 0,
  blocks: {
    12345: createBlock(12345, [
      createTx(1, 100, 12345, false),
      createTx(2, 200, 11345, false),
      createTx(3, 300, 11345, true),
      createTx(4, 400, 11345, false)
    ]),
    11345: createBlock(11345, [
      createTx(5, 100, 11345, false),
      createTx(6, 200, 10345, false)
    ])
  }
};

export default (state = EXPLORER_INITIAL_STATE, action) => {
  console.log("ADDING SOEMTHING TO STATE: ", action, state);
  const { type, payload } = action;
  console.log("ADDING SOEMTHING TO STATE: ", type, payload);
  switch (type) {
    case FETCHED_LATEST_BLOCKS:
      return update(state, {
        blocks: { $merge: payload.blocks },
        lastFetchedBlockNumber: { $set: payload.lastFetchedBlockNumber }
      });
    default:
      return EXPLORER_INITIAL_STATE;
  }
};
