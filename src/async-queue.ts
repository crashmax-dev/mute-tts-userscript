type Fn = () => Promise<void>

export class AsyncQueue {
  private queue: Fn[]
  private isProcessing: boolean

  constructor() {
    this.queue = []
    this.isProcessing = false
  }

  add(fn: Fn) {
    this.queue.push(fn)
    this.process()
  }

  async process() {
    if (this.isProcessing) return
    this.isProcessing = true
    while (this.queue.length) {
      const fn = this.queue.shift()
      if (fn) {
        await fn()
      }
    }
    this.isProcessing = false
  }
}
