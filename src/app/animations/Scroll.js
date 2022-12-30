import GSAP from 'gsap';
import { eases } from '../utils/easing';
export default class Scroll {
    constructor({ selector, id }) {
        this.selector = selector;
        this.id = id;

        this.el = document.querySelector('[data-smoothscroll]');
        this.containerHeight = this.el.getBoundingClientRect().height;

        /*//? dynamic calulation based on instance
        this.el = document.querySelector(this.selector);

        this.containerHeight =
            this.id === 'canvas'
                ? this.selector.getBoundingClientRect().bottom
                : this.selector.getBoundingClientRect().height;
        */

        this.footerScroll = document.querySelector('.footer_scroll');

        this.isEnabled = true;

        this.scroll = {
            start: 0,
            current: 0,
            target: 0,
            progress: 0,
            ease: 0.06,
            speed: 0.42,

            limit: this.containerHeight - window.innerHeight,
        };

        this.isMobile = window.matchMedia('(max-width: 769px)').matches;

        if (this.isMobile) this.initMobile();
        this.addEventListeners();
    }

    initMobile() {
        this.scroll.ease = 0.1;
    }

    onScrollTop() {
        GSAP.to(this.scroll, {
            duration: 0.96,
            target: 0,
            ease: eases.power2InOut,
        });
    }

    //? ----- EventListeners -----
    onChange() {
        this.scroll.target = 0;
        this.addEventListeners();
    }

    onResize() {
        //! Don't forget to change
        this.containerHeight = this.el.getBoundingClientRect().height;
    }

    onTouchDown(e) {
        if (!this.isMobile || !this.isEnabled) return;

        this.scroll.position = this.scroll.target;
        this.start = e.touches ? e.touches[0].clientY : e.clientY;
    }

    onTouchMove(e) {
        if (!this.isMobile || !this.isEnabled) return;

        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const distance = (this.start - y) * 3;

        this.scroll.target = this.scroll.position + distance;
    }

    onTouchUp() {
        // this.isEnabled = true;
    }

    onWheel(target) {
        if (!this.isEnabled || this.isMobile) return;

        const speed = target.pixelY;

        this.scroll.target += speed * this.scroll.speed;
    }

    addEventListeners() {
        this.footerScroll.addEventListener('click', this.onScrollTop.bind(this));
    }
}
