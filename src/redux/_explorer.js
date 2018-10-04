import { takeEvery, put } from "redux-saga/effects";
import createAction from "./_createAction";

// -- Constants --------------------------------------------------------------- //

export const FETCH_LATEST_BLOCK = "FETCH_LATEST_BLOCK";
export const FETCHED_LATEST_BLOCK = "FETCHED_LATEST_BLOCK";

// -- Actions --------------------------------------------------------------- //

export const fetchLatestBlock = () => createAction(FETCH_LATEST_BLOCK);
export const fetchedLatestBlock = block =>
  createAction(FETCHED_LATEST_BLOCK, { block });

// -- Sagas --------------------------------------------------------------- //

function* fetchLatestBlockSaga() {
  yield takeEvery(FETCH_LATEST_BLOCK, function*(action) {
    console.log("FETCHING LATEST BLOCK SAGA", action);
    yield put(fetchedLatestBlock({}));
  });
}

export const runExplorerSagas = sagaMiddleware => {
  sagaMiddleware.run(fetchLatestBlockSaga);
};

// -- Reducer --------------------------------------------------------------- //

export const EXPLORER_INITIAL_STATE = {
  elph: {
    blocks: [
      {
        number: 12345,
        hash:
          "0xd8cfcdbc65a949f02444f0fe2997510489874ee7c34da55e45f27d167e374dc6",
        transactions: [
          {
            hash: "0xasdf"
          }
        ]
      },
      {
        number: 87654,
        hash:
          "0xd8cfcdbc65a949f02444f0fe2997510489874ee7c34da55e45f27d167e374dc6",
        transactions: [
          {
            hash: "0xalkjhsdf"
          }
        ]
      }
    ]
  }
};

export default (state = EXPLORER_INITIAL_STATE, action) => {
  console.log("ADDING SOEMTHING TO STATE: ", action, state);
  const { type, payload } = action;
  console.log("ADDING SOEMTHING TO STATE: ", type, payload);
  switch (type) {
    case FETCHED_LATEST_BLOCK:
      return EXPLORER_INITIAL_STATE;
    default:
      return EXPLORER_INITIAL_STATE;
  }
};
