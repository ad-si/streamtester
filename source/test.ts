import { createReadStream } from "node:fs"
import { strict as assert } from "node:assert"
import { StreamTester } from "./index.ts"

const streamTester = new StreamTester({
  test: (chunk) => {
    assert.equal(JSON.parse(String(chunk)).name, "streamtester")
  },
})

createReadStream("./package.json").pipe(streamTester)
