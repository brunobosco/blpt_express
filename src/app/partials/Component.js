import EventEmitter from 'events';

export default class Component extends EventEmitter {
    constructor({ element, elements }) {
        super();

        this.selector = element;
        this.selectorChildren = { ...elements };

        this.create();
    }

    create() {
        this.element = document.querySelector(this.selector);
        this.elements = {};

        Object.entries(this.selectorChildren).forEach(([key, element]) => {
            if (
                element instanceof window.HTMLElement ||
                element instanceof window.NodeList ||
                Array.isArray()
            ) {
                this.elements[key] = element;
            } else {
                this.elements[key] = document.querySelectorAll(element);
                if (this.elements[key].length === 0) {
                    this.elements[key] = null;
                } else if (this.elements[key].length === 1) {
                    this.elements[key] = document.querySelector(element);
                }
            }
        });
    }
}
