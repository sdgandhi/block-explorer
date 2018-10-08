import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/Block.scss";
import logoSymbol from "../images/logo_symbol.png";

class Block extends PureComponent {
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
    const { block } = this.props;
    return (
      <div>
        <div className="card card-1 boxed boxed--sm boxed--border">
          <div className="card__top">
            <div className="card__avatar">
              <Link className="block-link" to={`/block/${block.hash}`}>
                <img alt="Image" src={logoSymbol} />
                <span>
                  <h4 className="block-number">Block #{block.number}</h4>
                </span>
              </Link>
            </div>
            <div className="card__meta">
              <span>53 mins</span>
            </div>
          </div>
          <div className="card__body">
            <strong>Block Hash:</strong>
            <p className="block-hash type--fade type--fine-print">
              {block.hash}
            </p>
            <div>
              <strong>Transactions:</strong>
            </div>
            {block.transactions.map(transaction => (
              <div key={transaction.hash} className="transaction" />
            ))}
          </div>
          <div className="card__bottom">
            <ul className="list-inline">
              <li className="list-inline-item">
                <div className="card__action">
                  <i className="icon-Add-File" />
                  <span>
                    <strong className="pl-2">9,813</strong> Transactions
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Block;
