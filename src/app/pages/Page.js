import each from 'lodash/each';
import GSAP from 'gsap';
import { eases } from '../utils/easing';

export default class Page {
    constructor({ element, elements, id }) {
        this.selector = element;
        this.selectorChildren = { ...elements };

        this.id = id;

        this.navTheme = document.querySelector('.nav_theme_container');

        this.isMobile = window.matchMedia('(max-width: 769px)').matches;

        this.dark = false;

        this.create();
        this.addEventListeners();
    }

    create() {
        this.element = document.querySelector(this.selector);
        this.elements = {};

        each(this.selectorChildren, (element, key) => {
            if (element instanceof window.HTMLElement || element instanceof window.NodeList || Array.isArray()) {
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

    initIntroAnimation() {
        this.intro = GSAP.timeline({ paused: true }).from(
            [this.selectorChildren.hero_title, this.selectorChildren.hero_time, this.selectorChildren.hero_extra],
            {
                duration: 0.64,
                autoAlpha: 0,
                y: '100%',
                ease: eases.power2Out,
                stagger: 0.064,
            }
        );
        // .from(
        //     [this.selectorChildren.title, this.selectorChildren.parag],
        //     {
        //         duration: 1.5,
        //         autoAlpha: 0,
        //         y: '101%',
        //         rotate: 2,
        //         stagger: 0.05,
        //         ease: eases.power2Out,
        //     },
        //     'start+=1'
        // );
    }
    showIntroAnimation() {
        this.intro.play();
    }
    hideIntroAnimation() {
        this.intro.reverse();
    }

    checkImage() {
        if (this.isMobile)
            this.selectorChildren.images.forEach((image) => {
                image.src === '' ? (image.style.height = '64rem') : (image.style.height = '100%');
            });
    }

    initTheme() {
        const root = document.documentElement;
        const text = document.querySelector('.nav_theme span');

        root.style.setProperty('--black', this.dark ? '#191919' : '#E4E8ED');
        root.style.setProperty('--white', this.dark ? '#E4E8ED' : '#191919');
        root.style.setProperty('--gray', this.dark ? '#222222' : '#dbdbdb');

        text.innerHTML = this.dark ? 'Light mode' : 'Dark mode';

        this.dark = !this.dark;
    }

    addEventListeners() {
        this.navTheme.onclick = () => {
            this.initTheme();
        };
    }
}
