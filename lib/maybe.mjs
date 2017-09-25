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
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
  }

  join() {
    return this.isNothing() ? null : this.__value;
  }
}
