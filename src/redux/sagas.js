import { runExplorerSagas } from "./_elph";
import { runEthSagas } from "./_eth";

// Run public-facing sagas that can be triggered by React components.
const runSagas = sagaMiddleware => {
  runExplorerSagas(sagaMiddleware);
  runEthSagas(sagaMiddleware);
};

export default runSagas;
