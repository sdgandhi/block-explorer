const ELPH_RPC_URL = "https://chain.elph.com:443/rpc";
const DEV_ELPH_RPC_URL = "http://localhost:5000/rpc";
const isDev = process && process.env && process.env.NODE_ENV === "development";

const ElphUtils = {
  isDev: () => isDev,

  getOriginUrl: () => window.location.origin,

  getRpcUrl: () => {
    if (localStorage.ELPH_RPC_URL) {
      return localStorage.ELPH_RPC_URL;
    }

    return isDev ? DEV_ELPH_RPC_URL : ELPH_RPC_URL;
  },

  setRpcUrl: rpcUrl => {
    localStorage.ELPH_RPC_URL = rpcUrl;
  }
};

export default ElphUtils;
