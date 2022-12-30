import GSAP from 'gsap';
import { TextPlugin } from 'gsap/all';
GSAP.registerPlugin(TextPlugin);

import { eases } from '../utils/easing';

export default class Menu {
    constructor() {
        this.menu = document.querySelector('.menu');

        this.menuWrapper = this.menu.children[0];
        this.menuFrame = this.menuWrapper.children[0];
        this.menuSubFrame = this.menuWrapper.children[1];
        this.menuOverlay = this.menu.children[1];

        this.wrapperElements = this.menu.querySelectorAll('.menu_pages_links .ofh a');
        this.wrapperPages = this.menu.querySelectorAll('.menu_pages_title > p');
        this.frameElements = this.menuSubFrame.querySelectorAll('.ofh > div');

        this.nav = document.querySelector('.nav');
        this.navMenu = this.nav.querySelector('.nav_menu');
        this.navMenuWrapper = this.nav.querySelector('.button_wrapper');
        this.navMenuText = this.nav.querySelector('.button_bottom span');

        this.isEnabled = false;

        this.animateMenu();
        this.animateButton();

        this.addEventListeners();
    }

    toggle(action) {
        !action ? this.open() : this.close();
    }

    animateMenu() {
        GSAP.set(this.menu, { pointerEvents: 'none' });

        this.tl = GSAP.timeline({ paused: true })
            .from(
                [this.menuFrame, this.menuSubFrame],
                {
                    duration: 0.48,
                    y: '-101%',
                    stagger: 0.024,
                    ease: eases.power2InOut,
                    boxShadow: 'none',
                },
                0
            )
            .from(
                [this.wrapperElements, this.frameElements, this.wrapperPages],
                {
                    duration: 0.64,
                    ease: eases.circOut,
                    y: '-100%',
                    stagger: {
                        each: 0.008,
                        from: 'bottom',
                        ease: eases.power2InOut,
                    },
                },
                0.32
            )
            .from(
                this.menuOverlay,
                {
                    duration: 0.86,
                    autoAlpha: 0,
                    ease: eases.power4Out,
                },
                0
            );
    }

    animateButton() {
        this.tlButton = GSAP.timeline({ paused: true })
            .to(this.navMenuText, {
                duration: 0.32,
                autoAlpha: 0,
                ease: eases.expoOut,
            })
            .to(this.navMenuText, {
                duration: 0.32,
                autoAlpha: 1,
                ease: eases.expoOut,
            })
            .to(
                this.navMenuText,
                {
                    duration: 1,
                    text: {
                        value: '.close',
                        delimiter: ' ',
                        speed: 1,
                    },
                    ease: eases.expoOut,
                },
                0.32
            );
    }

    open() {
        if (this.tl) this.tl.play();
        if (this.tlButton) this.tlButton.play();
        this.isEnabled = true;

        this.menu.style.pointerEvents = 'auto';
    }

    close() {
        if (this.tl) this.tl.reverse();
        if (this.tlButton) this.tlButton.reverse();
        this.isEnabled = false;

        this.menu.style.pointerEvents = 'none';
    }

    addEventListeners() {
        this.navMenu.onclick = () => this.toggle(this.isEnabled);
        this.menuOverlay.onclick = () => this.close();
    }
}
