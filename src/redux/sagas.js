import { runExplorerSagas } from "./_explorer";

// Run public-facing sagas that can be triggered by React components.
const runSagas = sagaMiddleware => {
  runExplorerSagas(sagaMiddleware);
};

export default runSagas;
