import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BlockCard from "./BlockCard.jsx";
import NotFound from "../NotFound";

class BlockDetails extends PureComponent {
  static propTypes = {
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

  render() {
    const blockNumber = this.props.match.params.number;

    // TODO(Sarat): Fetch this block if it isn't fetched yet.
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
  blocks: state.explorer.blocks
}))(BlockDetails);

export default BlockDetails;
