import GSAP from 'gsap';

import { eases } from '../utils/easing';

export default class Observer {
    constructor() {
        this.el = document.querySelector('[data-observer]');
        this.observerElements = this.el.querySelectorAll('section');

        this.options = {
            root: null,
            treshold: 0.5,
            rootMargin: '-100px',
        };

        this.init();
    }

    init() {
        this.observer = new IntersectionObserver(this.callback, this.options);

        this.observerElements.forEach((section) => {
            const row = section.querySelectorAll('div');

            this.tl = GSAP.timeline({ paused: true }).from(section, {
                duration: 1.2,
                autoAlpha: 0,
                ease: eases.expoOut,
            });

            section.timeline = this.tl;
        });

        Array.prototype.forEach.call(this.observerElements, (el) => {
            this.observer.observe(el);
        });
    }

    callback(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.timeline.play();
        });
    }
}
