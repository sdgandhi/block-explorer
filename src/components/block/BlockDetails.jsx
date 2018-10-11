import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BlockCard from "./BlockCard.jsx";
import NotFound from "../NotFound";
import { fetchBlock } from "../../redux/_explorer.js";
import Loader from "../Loader.jsx";

class BlockDetails extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        number: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    fetchingBlocks: PropTypes.objectOf(PropTypes.string).isRequired,
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
    const blockNumber = Number(this.props.match.params.number);

    if (blockNumber in this.props.fetchingBlocks) {
      return <Loader message="Fetching Block..." />;
    }

    const block = this.props.blocks[blockNumber];
    if (!block) {
      return <NotFound />;
    }

    return (
      <section>
        <div className="container">
          <BlockCard block={block} detailed />
        </div>
      </section>
    );
  }
}

BlockDetails = connect(state => ({
  fetchingBlocks: state.explorer.fetchingBlocks,
  blocks: state.explorer.blocks
}))(BlockDetails);

export default BlockDetails;
