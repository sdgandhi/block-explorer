export const rpcUrlSelector = state => state.elph.rpcUrl;
export const blocksSelector = state => state.elph.blocks;
export const pollForNewBlocksSelector = state => state.elph.pollForNewBlocks;
export const fetchingBlocksSelector = state => state.elph.fetchingBlocks;

export const lastFetchedBlockNumberSelector = state =>
  state.elph.lastFetchedBlockNumber;
