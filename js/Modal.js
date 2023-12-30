class Modal {
  #content = null;
  #container = document.body;
  #element = null;
  #renderer = null;

  constructor(rendererContent) {
    this.#renderer = rendererContent || (() => null);
  }

  showModal() {
    this.#content = this.#renderer();
    this.#element = document.createElement('div');

    this.#element.classList.add('modal');

    const modalBackground = document.createElement('div');
    modalBackground.classList.add('modal__content');


    modalBackground.appendChild(this.#content);
    this.#element.appendChild(modalBackground);

    this.#container.appendChild(this.#element);
  }

  closeModal() {
    this.#container.removeChild(this.#element);
  }
}

export { Modal };
