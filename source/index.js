const stream = require('stream')

module.exports = class StreamTester extends stream.Writable {
  constructor (options = {}) {
    super(options)
    Object.assign(this, options)
    this.firstCall = true
    this.objectMode = true
  }

  _write (chunk, encoding, done) {
    try {
      if (typeof this.filter === 'function') {
        const filteredChunk = this.filter(chunk)
        if (filteredChunk) this.test(filteredChunk)
      }

      else if (this.test) {
        this.test(chunk)
      }

      if (this.testFirst && this.firstCall === true) {
        this.testFirst(chunk)
        this.firstCall = false
      }

      done()
    }
    catch (error) {
      done(error)
    }
  }
}
