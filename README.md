# Performance-observer polyfill [![Travis Build Status][travis-img]][travis]
This project provides some basic polyfill functions for some of the network-based performance-observer APIs

[travis]: https://travis-ci.com/fastly/performance-observer-polyfill
[travis-img]: https://travis-ci.com/fastly/performance-observer-polyfill?token=ADD-HERE

## Quick links
- [FAQ](#faq)
- [Installation](#installation)
- [Running](#running)

## Installation

### Requirements
- Node.js >= 10

### Install
```sh
git clone git@github.com:fastly/performance-observer-polyfill.git
cd performance-observer-polyfill
npm install
npm run build
```

## Running
Most actions you'd like to perform whilst developing performance-observer-polyfill are defined as NPM scripts tasks and can be invoked using `npm run {task}`.

A list of all commands and their description can be found below.


| Name      | Description                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| build     | Compiles the application for production environments                                                           |
| build:dev | Compiles the application for development                                                                       |
| lint      | Lints the source files for style errors using ESLint and automatically formats the source files using prettier |
| test      | Runs the unit test suite                                                                                       |


## FAQ

### What is it?
Fastly Insights is an optional service deployed by some Fastly customers for network and performance monitoring and research purposes. It does not collect any personal data. We are only interested in your network, to make the internet work better.

We collect information about HTTP and HTTPS network transactions, including: network routing, performance timing, and equipment characteristics. Measurements are recorded to analyze the performance of the Fastly network and overall state of the internet. 

Insights.js is served via Fastly’s CDN. All collected data is sent back to the Fastly Insights service and log streamed using Fastly’s [log streaming](https://docs.fastly.com/guides/streaming-logs/) to a Fastly managed data warehouse for subsequent analysis. 

### How does it work?

To-be-written

## License
[MIT](https://github.com/fastly/insights.js/blob/master/LICENSE)
