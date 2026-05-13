import { Writable, type WritableOptions } from "node:stream"

export type Chunk = Buffer | string | unknown

export interface StreamTesterOptions extends WritableOptions {
  filter?: (chunk: Chunk) => Chunk | false | null | undefined
  test?: (chunk: Chunk) => void
  testFirst?: (chunk: Chunk) => void
}

export class StreamTester extends Writable {
  readonly filter?: StreamTesterOptions["filter"]
  readonly test?: StreamTesterOptions["test"]
  readonly testFirst?: StreamTesterOptions["testFirst"]
  #firstCall = true

  constructor(options: StreamTesterOptions = {}) {
    super({ ...options, objectMode: true })
    this.filter = options.filter
    this.test = options.test
    this.testFirst = options.testFirst
  }

  override _write(
    chunk: Chunk,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void,
  ): void {
    try {
      if (this.filter) {
        const filteredChunk = this.filter(chunk)
        if (filteredChunk) this.test?.(filteredChunk)
      }
      else if (this.test) {
        this.test(chunk)
      }

      if (this.testFirst && this.#firstCall) {
        this.testFirst(chunk)
        this.#firstCall = false
      }

      done()
    }
    catch (error) {
      done(error as Error)
    }
  }
}

export default StreamTester
