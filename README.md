# StreamTester

A writable stream which can perform specified tests on the written data.

## Installation

```shell
npm install --save-dev streamtester
```

## Usage

```ts
import { createReadStream } from "node:fs"
import { strict as assert } from "node:assert"
import { StreamTester } from "streamtester"

const streamTester = new StreamTester({
  test: (chunk) => {
    assert.equal(JSON.parse(String(chunk)).name, "streamtester")
  },
})

createReadStream("./package.json").pipe(streamTester)
```

### Options

- `test(chunk)` — called for every chunk (or, when `filter` is set, for every truthy filtered chunk).
- `filter(chunk)` — transforms a chunk before testing. Falsy return values skip the chunk.
- `testFirst(chunk)` — called once with the first chunk written to the stream.
