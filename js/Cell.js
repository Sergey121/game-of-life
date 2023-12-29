import { parseId } from './utils';

class Cell {
  #id = null;
  #value = 0;

  constructor(id, value) {
    this.#id = id;
    this.#value = value;
  }

  get id() {
    return this.#id;
  }

  get value() {
    return this.#value;
  }

  set value(value) {
    this.#value = value;
  }

  get position() {
    return parseId(this.#id);
  }
}

export { Cell };
