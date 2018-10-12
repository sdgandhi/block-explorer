import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { fetchBlock } from "../../redux/_elph.js";
import Loader from "../Loader.jsx";
import NotFound from "../NotFound";

const withBlockFetcher = Component =>
  class extends PureComponent {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      fetchingBlocks: PropTypes.objectOf(PropTypes.string).isRequired,
      match: PropTypes.shape({
        params: PropTypes.shape({
          number: PropTypes.string.isRequired
        }).isRequired
      }).isRequired,
      blocks: PropTypes.objectOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          hash: PropTypes.string.isRequired,
          txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired
      ).isRequired
    };

    componentDidMount() {
      const blockNumber = this.props.match.params.number;
      this.props.dispatch(fetchBlock(blockNumber));
    }

    render() {
      const blockNumber = this.props.match.params.number;

      if (blockNumber in this.props.fetchingBlocks) {
        return <Loader message="Fetching Transaction..." />;
      }

      const block = this.props.blocks[blockNumber];
      if (!block) {
        return <NotFound />;
      }

      return <Component block={block} {...this.props} />;
    }
  };

export default compose(
  connect(
    state => ({
      fetchingBlocks: state.elph.fetchingBlocks,
      blocks: state.elph.blocks
    }),
    null
  ),
  withBlockFetcher
);
