import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles/Block.css";

class Block extends Component {
  static propTypes = {
    block: PropTypes.shape({
      number: PropTypes.number.isRequired,
      hash: PropTypes.string.isRequired,
      transactions: PropTypes.arrayOf(
        PropTypes.shape({
          hash: PropTypes.string.isRequired
        })
      )
    }).isRequired
  };

  render() {
    const block = this.props.block;
    return (
      <div
        key={block.number}
        className="bg--secondary boxed boxed--border boxed--lg"
      >
        <h4 className="block-number">Block #{block.number}</h4>
        <p className="block-hash type--fade type--fine-print">{block.hash}</p>
        <p className="type--underline mb-0">
          {block.transactions.length} Transactions
        </p>
        {block.transactions.map(() => (
          <div className="boxed bg--primary boxed--border transaction" />
        ))}
      </div>
    );
  }
}

export default Block;
