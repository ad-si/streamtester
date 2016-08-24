const fs = require('fs')
const assert = require('assert')
const StreamTester = require('./index')
const streamTester = new StreamTester({
  test: (chunk) =>
    assert(JSON.parse(chunk.toString()).name === 'streamtester')
})
const packageStream = fs.createReadStream('./package.json')

packageStream.pipe(streamTester)
