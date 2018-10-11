export const blocksSelector = state => state.explorer.blocks;
export const fetchingBlocksSelector = state => state.explorer.fetchingBlocks;

export const lastFetchedBlockNumberSelector = state =>
  state.explorer.lastFetchedBlockNumber;
