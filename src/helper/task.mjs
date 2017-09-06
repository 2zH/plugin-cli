const asyncCompose = (...rest) => async (v) => rest
  .reverse()
  .reduce(
    async (initResult, func) => {
      const result = await initResult(v)
      return func(result)
    }
  )

export default class Task {
  constructor(f) {
    this.__value = f
  }

  static of(v) {
    return new Task(v)
  }

  isNothing(v) {
    return !this.__value || (!v && v !== 0)
  }

  map(f) {
    return Task.of(
      asyncCompose(f, this.__value)
    )
  }

  fork(v) {
    return this.isNothing(v) ? null : this.__value(v)
  }

  join() {
    return this.__value
  }
}
