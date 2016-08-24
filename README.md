# StreamTester

A writable stream which can perform specified tests on the written data

## Installation

```shell
npm install --save-dev streamtester
```

## Usage

```js
const fs = require('fs')
const packageStream = fs.createReadStream('./package.json')
const StreamTester = require('streamtester')
const streamTester = new StreamTester({
  test: (chunk) =>
    console.assert(JSON.parse(chunk.toString()).name === 'streamtester')
})

packageStream.pipe(streamTester)
```
