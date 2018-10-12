import { runExplorerSagas } from "./_elph";

// Run public-facing sagas that can be triggered by React components.
const runSagas = sagaMiddleware => {
  runExplorerSagas(sagaMiddleware);
};

export default runSagas;
