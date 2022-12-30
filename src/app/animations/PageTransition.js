import GSAP from 'gsap';
import { eases } from '../utils/easing';

export default class PageTransition {
    constructor() {
        this.element = document.querySelector('.pt');
        this.wrapper = this.element.querySelectorAll('.pt_wrapper > p');

        this.main = document.querySelector('.template');
        this.nav = document.querySelector('.nav');

        this.init();
    }

    init() {
        GSAP.set(this.wrapper, { autoAlpha: 0, y: '100%' });
    }

    show(page) {
        const pathname = this.element.querySelector('.pt_pathname');
        pathname.innerHTML = page === '' ? 'Home' : page;

        return new Promise((resolve) => {
            GSAP.timeline()
                .to(this.element, {
                    duration: 0.16,
                    autoAlpha: 1,
                    ease: eases.power2Out,
                })
                .to(
                    this.wrapper,
                    {
                        duration: 0.32,
                        autoAlpha: 1,
                        y: '0',
                        stagger: 0.08,
                        ease: eases.power2Out,
                        onComplete: resolve,
                    },
                    0.2
                )
                .to(
                    [this.main, this.nav],
                    {
                        duration: 0.16,
                        ease: eases.power2Out,
                        autoAlpha: 0,
                    },
                    0
                );
        });
    }

    hide() {
        return new Promise((resolve) => {
            GSAP.timeline()
                .to(
                    [this.main, this.nav],
                    {
                        duration: 0.16,
                        delay: 0.2,
                        ease: eases.power2Out,
                        autoAlpha: 1,
                    },
                    0
                )
                .to(
                    this.wrapper,
                    {
                        duration: 0.32,
                        autoAlpha: 0,
                        y: '100%',
                        stagger: 0.08,
                        ease: eases.power2Out,
                        onComplete: resolve,
                    },
                    0.2
                )
                .to(this.element, {
                    duration: 0.2,
                    autoAlpha: 0,
                    ease: eases.power2Out,
                });
        });
    }

    addEventListeners() {
        window.addEventListener('click', this.show.bind(this));
        window.addEventListener('mousewheel', this.hide.bind(this));
    }
}
