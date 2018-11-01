import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "../../styles/TxList.scss";
import Link from "react-router-dom/Link";

class BlockLink extends PureComponent {
  static propTypes = {
    blockNumber: PropTypes.string.isRequired
  };

  render() {
    const { blockNumber } = this.props;

    return blockNumber === 0 ? (
      <code className="type--bold color--dark">#{blockNumber}</code>
    ) : (
      <Link to={`/block/${blockNumber}`}>
        <code className="type--bold">#{blockNumber}</code>
      </Link>
    );
  }
}

export default BlockLink;
