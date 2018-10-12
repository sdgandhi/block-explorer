import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import BlockCard from "./BlockCard.jsx";
import withBlockFetcher from "../hoc/withBlockFetcher.jsx";

class BlockDetails extends PureComponent {
  static propTypes = {
    block: PropTypes.shape({
      number: PropTypes.number.isRequired,
      hash: PropTypes.string.isRequired,
      txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  };

  render() {
    const { block } = this.props;
    return (
      <section>
        <div className="container">
          <BlockCard block={block} detailed />
        </div>
      </section>
    );
  }
}

export default withBlockFetcher(BlockDetails);
