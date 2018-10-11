import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../styles/Block.scss";
import logoSymbol from "../../images/logo_symbol.png";
import CopyToClipboardButton from "../CopyToClipboardButton";
import ElphUtils from "../../utils/ElphUtils";
import TxList from "./TxList";

class BlockCard extends PureComponent {
  static propTypes = {
    detailed: PropTypes.bool,
    block: PropTypes.shape({
      number: PropTypes.number.isRequired,
      hash: PropTypes.string.isRequired,
      minedAt: PropTypes.number.isRequired,
      txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  };

  static defaultProps = {
    detailed: false
  };

  render() {
    const { block, detailed } = this.props;
    const numTxns = block.txHashes.length;
    const blockUrl = `/block/${block.number}`;
    const absoluteBlockUrl = `${ElphUtils.getOriginUrl()}${blockUrl}`;
    const minedAtDate = new Date(block.minedAt).toLocaleString("en-US");

    return (
      <div className="card card-1 boxed boxed--sm boxed--border">
        <div className="card__top">
          <div className="card__avatar">
            <Link className="block-link" to={blockUrl}>
              <img alt="logo symbol" src={logoSymbol} />
              <span>
                <h4 className="block-number">Block #{block.number}</h4>
              </span>
            </Link>
          </div>
          <div className="card__meta">
            <span>{minedAtDate}</span>
          </div>
        </div>
        <div className="card__body">
          <strong>Block Hash:</strong>
          <p className="block-hash type--fade type--fine-print">{block.hash}</p>
          <div>
            <strong>{numTxns} Transactions:</strong>
          </div>
          <div className="d-flex flex-wrap justify-content-start align-items-start">
            {block.txHashes.map(hash => (
              <div key={hash} className="transaction" />
            ))}
          </div>
          {detailed && (
            <div className="pt-4">
              <TxList txHashes={block.txHashes} />
            </div>
          )}
        </div>
        <div className="card__bottom">
          <ul className="list-inline">
            <li className="list-inline-item">
              <div className="card__action">
                <i className="icon-Link" />
                <CopyToClipboardButton
                  textToCopy={absoluteBlockUrl}
                  title="Copy Link"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default BlockCard;
