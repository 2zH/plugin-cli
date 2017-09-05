export default class Maybe {
  constructor(v) {
    this.__value = v;
  }

  static of(v) {
    return new Maybe(v);
  }

  isNothing() {
    return !this.__value && this.__value !== 0;
  }

  map(f) {
    if (this.isNothing()) {
      return Maybe.of(null);
    }
    return Maybe.of(f(this.__value));
  }

  join() {
    return this.__value;
  }
}
