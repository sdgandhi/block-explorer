import request from "request";

const numberToHex = num => {
  const hex = num.toString(16);
  return hex.length % 2 === 0 ? `0x${hex}` : `0x0${hex}`;
};

const EthUtils = {
  getNetwork: () => "mainnet",

  getTxCountForBlock: blockNumber => {
    const hexBlockNumber = numberToHex(blockNumber);
    const qs = {
      module: "proxy",
      action: "eth_getBlockTransactionCountByNumber",
      tag: hexBlockNumber,
      apikey: "FYHX62PY9IZG2FEH8C5MT3BTU29336HTC8"
    };

    const url =
      EthUtils.getNetwork() === "mainnet"
        ? "https://api.etherscan.io/api"
        : `https://api-${EthUtils.getNetwork()}.etherscan.io/api`;
    return new Promise((resolve, reject) => {
      request.get({ url, qs }, (err, _, body) => {
        if (err) {
          reject(err);
          return;
        }

        const { result } = JSON.parse(body);
        const txCount = result === null ? null : parseInt(result, 16);
        resolve(txCount);
      });
    });
  }
};

export default EthUtils;
