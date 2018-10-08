# Overview
This is a block-explorer for the Elph Plasma Chain.

## Getting Started
To start the server, run:
```bash
yarn start
```

## Development
To start the server *and* start the side chain, run:
```bash
foreman start
```

This project relies on having the [elph-sdk](https://github.com/ElphDev/elph-sdk) repository available and setup properly. To set up this repository, run:
```bash
cd ../
git clone git@github.com:ElphDev/elph-sdk.git
cd elph-sdk
yarn install
yarn build
```

Verify that `../elph-sdk/dist` exists!
