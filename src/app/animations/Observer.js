import GSAP from 'gsap';

import { eases } from '../utils/easing';
import each from 'lodash/each';

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

        each(this.observerElements, (section) => {
            const row = section.querySelectorAll('div');

            this.tl = GSAP.timeline({ paused: true }).from(section, {
                duration: 1.2,
                autoAlpha: 0,
                ease: eases.expoOut,
            });
            // .from(row, {
            //     duration: 0.8,
            //     autoAlpha: 0,
            //     ease: eases.expoOut,
            //     stagger: {
            //         each: 0.08,
            //         // from: 'center',
            //         ease: eases.expoOut,
            //     },
            // });

            section.timeline = this.tl;
        });

        Array.prototype.forEach.call(this.observerElements, (el) => {
            this.observer.observe(el);
        });
    }

    callback(entries, observer) {
        each(entries, (entry) => {
            if (entry.isIntersecting) entry.target.timeline.play();
        });
    }
}
