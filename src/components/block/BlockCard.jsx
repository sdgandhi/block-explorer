import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "../../styles/Block.scss";
import logoSymbol from "../../images/logo_symbol.png";
import ethLogoSymbol from "../../images/ethereum_symbol.png";
import CopyToClipboardButton from "../CopyToClipboardButton";
import ElphUtils from "../../utils/ElphUtils";
import TxList from "./TxList";
import BlockLink from "./BlockLink";

class BlockCard extends PureComponent {
  static propTypes = {
    detailed: PropTypes.bool,
    eth: PropTypes.bool,
    block: PropTypes.shape({
      number: PropTypes.number.isRequired,
      hash: PropTypes.string.isRequired,
      minedAt: PropTypes.number.isRequired,
      txHashes: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  };

  static defaultProps = {
    detailed: false,
    eth: false
  };

  render() {
    const { block, detailed, eth } = this.props;
    const txCount = block.txCount;
    const blockUrl = `/block/${block.number}`;
    const absoluteBlockUrl = `${ElphUtils.getOriginUrl()}${blockUrl}`;
    const minedAtDate = new Date(block.minedAt).toLocaleString("en-US");

    const etherscanUrl = `https://etherscan.io/block/${block.number}`;

    return (
      <div className="card card-1 boxed boxed--sm boxed--border">
        <div className="card__top">
          <div className="card__avatar">
            {eth ? <img alt="logo symbol" src={ethLogoSymbol} /> : <img alt="logo symbol" src={logoSymbol} />}
            <h4 className="block-number">
              <span className="mr-2">Block</span>

              {eth ? (
                <a target="_blank" rel="noopener noreferrer" href={etherscanUrl}>
                  <code className="type--bold">#{block.number}</code>
                </a>
              ) : (
                <BlockLink blockNumber={block.number} />
              )}
            </h4>
          </div>
          <div className="card__meta">
            <span>{minedAtDate}</span>
          </div>
        </div>
        <div className="card__body">
          <strong>Block Hash:</strong>
          <p className="block-hash type--fade type--fine-print">{block.hash}</p>
          <div>
            <strong>{txCount} Transactions:</strong>
          </div>
          <div className="d-flex flex-wrap justify-content-start align-items-start">
            {[...Array(txCount).keys()].map(hash => (
              <div key={`${block.hash}${hash}`} className="transaction" />
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
                {eth ? (
                  <a className="pl-2 color--grey" target="_blank" rel="noopener noreferrer" href={etherscanUrl}>
                    View on Etherscan
                  </a>
                ) : (
                  <CopyToClipboardButton textToCopy={absoluteBlockUrl} title="Copy Link" />
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default BlockCard;
