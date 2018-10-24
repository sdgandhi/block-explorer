<a href="https://elph.com" target="_blank">
  <img src="https://s3.amazonaws.com/elph-static/logo.svg" height="85px">
</a>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/elphnetwork/block-explorer/blob/master/LICENSE.txt)
[![Node Version](https://img.shields.io/badge/node-v8.11.3-brightgreen.svg)](https://nodejs.org/en/)
[![Telegram](https://img.shields.io/badge/telegram-join%20chat-blue.svg)](https://t.me/elphnetwork)

# [Block Explorer](https://explorer.elph.com)

> Elph Block Explorer is a light weight client application that connects to a specified Elph Plasma Chain. Blocks and transactions that were made on the side chain can be observed.
>
> The explorer is primarily meant to showcase the speed, and efficiency of the Elph Network when compared to the Ethereum Mainnet.

![screenshot](https://s3.amazonaws.com/elph-static/browser-3.png)

## Demo

[Elph Block Explorer](https://explorer.elph.com) is the official testnet block explorer for Elph Plasma Chain. We will periodically deploy updated versions as new features get developed.

## Key Features

- Comparison of Elph Testnet vs Ethereum Mainnet
- Customizable Elph Plasma Chain endpoint for production / development testing
- Live analysis of Transaction Speed and Network Capactiy on Elph Network & Ethereum
- Elph Plasma Chain Block Visualization
  - Detailed Block information
  - Detailed Transaction information

## Development

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/). We also recommend using [Yarn](https://yarnpkg.com/en/) over NPM. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/elphnetwork/block-explorer.git

# Go into the repository
$ cd block-explorer

# Install dependencies
$ yarn install

# Run the app
$ yarn start
```

Note: At this time, the `elph-sdk` dependency is not yet deployed to NPM, please clone and follow those instructions to run the block explorer locally.

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Deployment

To deploy a production optimized version of the block-explorer:

```bash
# Build this repository
$ yarn build

# Install serve dependency
$ yarn global add serve

# Serve static folder
$ serve -s build

# Serving!
#   - Local:            http://localhost:5000
#   - On Your Network:  http://192.168.1.7:5000
```

## Related

[elph-sdk](https://github.com/elphnetwork/elph-sdk) - Elph JS SDK to talk to the Elph Plasma Chain

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Contact

Interested in getting touch with the Elph team? Feel free to [join our telegram](http://t.me/elphnetwork) to ask any questions or share any feedback!

## License

[MIT](https://github.com/elphnetwork/block-explorer/blob/master/LICENSE.txt)
