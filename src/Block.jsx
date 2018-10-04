import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles/Block.css";
import { Link } from "react-router-dom";

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
        <Link to={`/block/${block.hash}`}>
          <h4 className="block-number">Block #{block.number}</h4>
        </Link>
        <p className="block-hash type--fade type--fine-print">{block.hash}</p>
        <p className="type--underline mb-0">
          {block.transactions.length} Transactions
        </p>
        {block.transactions.map(transaction => (
          <div
            key={transaction.hash}
            className="boxed bg--primary boxed--border transaction"
          />
        ))}
      </div>
    );
  }
}

export default Block;
