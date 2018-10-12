import { takeEvery, put, call, select } from "redux-saga/effects";
import Elph from "elph-sdk";
import update from "immutability-helper";
import createAction from "./_createAction";
import {
  lastFetchedBlockNumberSelector,
  blocksSelector,
  fetchingBlocksSelector
} from "./selectors";

const elph = new Elph("http://localhost:5000/rpc");

// -- Constants --------------------------------------------------------------- //

const FETCH_BLOCK = "FETCH_BLOCK";
const FETCHING_BLOCK = "FETCHING_BLOCK";
const FETCH_LATEST_BLOCKS = "FETCH_LATEST_BLOCKS";
const RECORD_FETCHED_BLOCKS = "RECORD_FETCHED_BLOCKS";
const RECORD_FETCH_FAILURE_BLOCKS = "RECORD_FETCH_FAILURE_BLOCKS";

// -- Actions --------------------------------------------------------------- //

export const fetchBlock = blockNumber =>
  createAction(FETCH_BLOCK, { blockNumber });
const fetchingBlock = blockNumber =>
  createAction(FETCHING_BLOCK, { blockNumber });
export const fetchLatestBlocks = () => createAction(FETCH_LATEST_BLOCKS);
const recordFetchedBlocks = (blocks, txns, lastFetchedBlockNumber) =>
  createAction(RECORD_FETCHED_BLOCKS, { blocks, txns, lastFetchedBlockNumber });
const recordFetchFailureBlocks = blockNumbers =>
  createAction(RECORD_FETCH_FAILURE_BLOCKS, { blockNumbers });

// -- Sagas --------------------------------------------------------------- //

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
    console.log("FETCH BLOCK SAGA", action);
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

      console.log("Fetching block: ", blockNumber);
      yield put(fetchingBlock(blockNumber));
      const lastFetchedBlockNumber = yield select(
        lastFetchedBlockNumberSelector
      );
      const blockResponse = yield call(elph.getBlock, blockNumber);
      const { newBlocks, newTxns } = parseBlocksResponse([blockResponse]);
      yield put(
        recordFetchedBlocks(newBlocks, newTxns, lastFetchedBlockNumber)
      );
    } catch (e) {
      // TODO(Sarat): Be able to distinguish between network errors and other errors.
      console.error(e);
      yield put(recordFetchFailureBlocks([blockNumber]));
    }
  });
}

function* fetchLatestBlocksSaga() {
  yield takeEvery(FETCH_LATEST_BLOCKS, function* handler(action) {
    console.log("FETCH LATEST BLOCK SAGA", action);
    const lastFetchedBlockNumber = yield select(lastFetchedBlockNumberSelector);
    const blocksList = yield call(elph.getBlocks, lastFetchedBlockNumber);

    const { newBlocks, newTxns } = parseBlocksResponse(blocksList);

    const latestBlockNumber = Math.max(
      lastFetchedBlockNumber,
      ...Object.keys(newBlocks)
    );

    yield put(recordFetchedBlocks(newBlocks, newTxns, latestBlockNumber));
  });
}

export const runExplorerSagas = sagaMiddleware => {
  sagaMiddleware.run(fetchLatestBlocksSaga);
  sagaMiddleware.run(fetchBlockSaga);
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

const createBlock = (number, txHashes) => ({
  number,
  txHashes,
  txCount: txHashes.length,
  minedAt: Date.now(),
  hash: `0x${number}dbc65a949f02444f0fe2997510489874ee7c34da55e45f27d167e374dc6`,
  signature:
    "0x00552bbcf4ddecea0aba93edacb85bdd182d4fac69c2aa5f861d15f03d23ed7b947829234a73e833bbcc49eb0fdc8dcdc29a3f7fa3cb0d5067cd9956312811081801"
});

export const EXPLORER_INITIAL_STATE = {
  lastFetchedBlockNumber: 0,
  fetchingBlocks: {},
  blocks: {
    12345: createBlock(12345, [
      "0x1c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f",
      "0x2c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f",
      "0x3c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f",
      "0x4c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f"
    ]),
    11345: createBlock(11345, [
      "0x5c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f",
      "0x6c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f"
    ])
  },
  txns: {
    "0x1c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f": createTx(
      1,
      100,
      12345,
      false
    ),
    "0x2c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f": createTx(
      2,
      200,
      11345,
      false
    ),
    "0x3c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f": createTx(
      3,
      300,
      11345,
      true
    ),
    "0x4c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f": createTx(
      4,
      400,
      11345,
      false
    ),
    "0x5c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f": createTx(
      5,
      100,
      11345,
      false
    ),
    "0x6c31fc15422ebad28aaf9089c306702f67540b53c7eea8b7d2941044b027100f": createTx(
      6,
      200,
      10345,
      false
    )
  }
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case RECORD_FETCHED_BLOCKS:
      return update(state, {
        blocks: { $merge: payload.blocks },
        txns: { $merge: payload.txns },
        lastFetchedBlockNumber: { $set: payload.lastFetchedBlockNumber },
        fetchingBlocks: { $unset: Object.keys(payload.blocks) }
      });
    case RECORD_FETCH_FAILURE_BLOCKS:
      return update(state, {
        fetchingBlocks: { $unset: payload.blockNumbers }
      });
    case FETCHING_BLOCK:
      return update(state, {
        fetchingBlocks: { $merge: { [payload.blockNumber]: "fetching" } }
      });
    default:
      return state;
  }
};

export default (state = EXPLORER_INITIAL_STATE, action) => {
  const newState = reducer(state, action);
  return newState;
};
