import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../styles/CopyToClipboardButton.scss";

class CopyToClipboardButton extends PureComponent {
  static propTypes = {
    textToCopy: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { copiedLink: false };
  }

  onCopiedLink = () => {
    this.setState({ copiedLink: true });
    setTimeout(() => {
      this.setState({ copiedLink: false });
    }, 2000);
  };

  render() {
    return (
      <CopyToClipboard text={this.props.textToCopy} onCopy={this.onCopiedLink}>
        <span className="copy-button">
          {this.state.copiedLink ? (
            <span className="pl-2 type--bold color--success">Copied!</span>
          ) : (
            <span className="pl-2 color--grey">{this.props.title}</span>
          )}
        </span>
      </CopyToClipboard>
    );
  }
}

export default CopyToClipboardButton;
