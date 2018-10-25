import { takeEvery, put, call, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import Elph from "elph-sdk";
import update from "immutability-helper";
import createAction from "./_createAction";
import ElphUtils from "../utils/ElphUtils";
import {
  lastFetchedBlockNumberSelector,
  blocksSelector,
  fetchingBlocksSelector,
  pollForNewBlocksSelector,
  rpcUrlSelector
} from "./selectors";

let elph = new Elph({
  url: ElphUtils.getRpcUrl(),
  key: "0xa18969817c2cefadf52b93eb20f917dce760ce13b2ac9025e0361ad1e7a1d448"
});

const BLOCK_FETCH_INTERVAL = 5000;

// -- Constants --------------------------------------------------------------- //

const SET_RPC_URL = "SET_RPC_URL";
const FETCH_BLOCK = "FETCH_BLOCK";
const FETCHING_BLOCK = "FETCHING_BLOCK";
const SUBSCRIBE_TO_BLOCKS = "SUBSCRIBE_TO_BLOCKS";
const STOP_BLOCK_SUBSCRIPTION = "STOP_BLOCK_SUBSCRIPTION";
const RECORD_FETCHED_BLOCKS = "RECORD_FETCHED_BLOCKS";
const RECORD_FETCH_FAILURE_BLOCKS = "RECORD_FETCH_FAILURE_BLOCKS";

// -- Actions --------------------------------------------------------------- //

export const setRpcUrl = rpcUrl => createAction(SET_RPC_URL, { rpcUrl });
export const fetchBlock = blockNumber => createAction(FETCH_BLOCK, { blockNumber });
const fetchingBlock = blockNumber => createAction(FETCHING_BLOCK, { blockNumber });
export const subscribeToBlocks = () => createAction(SUBSCRIBE_TO_BLOCKS);
export const stopBlockSubscription = () => createAction(STOP_BLOCK_SUBSCRIPTION);
const recordFetchedBlocks = (blocks, txns, lastFetchedBlockNumber, newTxCount = 0) =>
  createAction(RECORD_FETCHED_BLOCKS, {
    blocks,
    txns,
    lastFetchedBlockNumber,
    newTxCount
  });
const recordFetchFailureBlocks = blockNumbers => createAction(RECORD_FETCH_FAILURE_BLOCKS, { blockNumbers });

// -- Sagas --------------------------------------------------------------- //

function* setRpcUrlSaga() {
  yield takeEvery(SET_RPC_URL, function* handler() {
    const newRpcUrl = yield select(rpcUrlSelector);
    ElphUtils.setRpcUrl(newRpcUrl);
    elph = new Elph(newRpcUrl);
  });
}

const parseBlocksResponse = blocksList => {
  // Construct block map and txns map from the results.
  const newBlocks = {};
  const newTxns = {};
  blocksList.forEach(block => {
    const formattedBlock = { ...block, minedAt: Date.now() };
    const txList = block.txns;
    delete formattedBlock.txns;
    formattedBlock.txHashes = txList.map(tx => tx.hash);
    formattedBlock.txCount = formattedBlock.txHashes.length;
    txList.forEach(tx => {
      newTxns[tx.hash] = tx;
    });
    newBlocks[block.number] = formattedBlock;
  });

  return { newBlocks, newTxns };
};

function* fetchBlockSaga() {
  yield takeEvery(FETCH_BLOCK, function* handler(action) {
    const blockNumber = Number(action.payload.blockNumber);

    try {
      // Don't fetch the block if it is already fetched.
      const blocks = yield select(blocksSelector);
      if (blockNumber in blocks) {
        return;
      }

      const fetchingBlocks = yield select(fetchingBlocksSelector);
      if (blockNumber in fetchingBlocks) {
        console.log("Block is already being fetched");
        return;
      }

      yield put(fetchingBlock(blockNumber));
      const lastFetchedBlockNumber = yield select(lastFetchedBlockNumberSelector);
      const blockResponse = yield call(elph.getBlock, blockNumber);
      const { newBlocks, newTxns } = parseBlocksResponse([blockResponse]);
      yield put(recordFetchedBlocks(newBlocks, newTxns, lastFetchedBlockNumber));
    } catch (e) {
      // TODO(Sarat): Be able to distinguish between network errors and other errors.
      console.error(e);
      yield put(recordFetchFailureBlocks([blockNumber]));
    }
  });
}

function* pollForNewBlocks() {
  let poll = yield select(pollForNewBlocksSelector);
  let isFirstFetch = true;

  while (poll) {
    try {
      // Set the high watermark for block numbers starting at the current block number if it hasn't been set.
      let lastFetchedBlockNumber = yield select(lastFetchedBlockNumberSelector);
      if (lastFetchedBlockNumber === 0) {
        lastFetchedBlockNumber = yield call(elph.getBlockNumber);
      }

      // Fetch the previous few blocks for seeding purposes, if this is the first time fetching.
      if (isFirstFetch) {
        lastFetchedBlockNumber = Math.max(0, lastFetchedBlockNumber - 2000);
        isFirstFetch = false;
      }

      // Actually fetch the blocks after the watermark.
      const blocksList = yield call(elph.getBlocks, lastFetchedBlockNumber);
      const { newBlocks, newTxns } = parseBlocksResponse(blocksList);

      // Calculate the new watermark based on the latest block that was returned.
      const latestBlockNumber = Math.max(lastFetchedBlockNumber, ...Object.keys(newBlocks));

      // Calculate the number of new transactions added.
      const newTxCount = Object.values(newBlocks).reduce((total, block) => total + block.txCount, 0);

      yield put(recordFetchedBlocks(newBlocks, newTxns, latestBlockNumber, newTxCount));

      yield call(delay, BLOCK_FETCH_INTERVAL);
    } catch (e) {
      console.error(e);
      yield call(delay, BLOCK_FETCH_INTERVAL * 10);
    }

    poll = yield select(pollForNewBlocksSelector);
  }
}

function* subscribeToBlocksSaga() {
  yield takeEvery(SUBSCRIBE_TO_BLOCKS, function* handler() {
    yield call(pollForNewBlocks);
  });
}

export const runExplorerSagas = sagaMiddleware => {
  sagaMiddleware.run(subscribeToBlocksSaga);
  sagaMiddleware.run(fetchBlockSaga);
  sagaMiddleware.run(setRpcUrlSaga);
};

// -- Reducer --------------------------------------------------------------- //

export const EXPLORER_INITIAL_STATE = {
  rpcUrl: ElphUtils.getRpcUrl(),
  txCountSinceVisiting: 0,
  pollForNewBlocks: true,
  lastFetchedBlockNumber: 0,
  fetchingBlocks: {},
  blocks: {},
  txns: {}
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_RPC_URL:
      return update(state, { rpcUrl: { $set: payload.rpcUrl } });
    case RECORD_FETCHED_BLOCKS:
      return update(state, {
        blocks: { $merge: payload.blocks },
        txns: { $merge: payload.txns },
        lastFetchedBlockNumber: { $set: payload.lastFetchedBlockNumber },
        fetchingBlocks: { $unset: Object.keys(payload.blocks) },
        txCountSinceVisiting: count => count + payload.newTxCount
      });
    case RECORD_FETCH_FAILURE_BLOCKS:
      return update(state, {
        fetchingBlocks: { $unset: payload.blockNumbers }
      });
    case FETCHING_BLOCK:
      return update(state, {
        fetchingBlocks: { $merge: { [payload.blockNumber]: "fetching" } }
      });
    case SUBSCRIBE_TO_BLOCKS:
      return update(state, { pollForNewBlocks: { $set: true } });
    case STOP_BLOCK_SUBSCRIPTION:
      return update(state, { pollForNewBlocks: { $set: false } });
    default:
      return state;
  }
};

export default (state = EXPLORER_INITIAL_STATE, action) => {
  const newState = reducer(state, action);
  return newState;
};
