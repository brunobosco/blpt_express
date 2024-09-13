import GSAP from 'gsap';
import Component from '../partials/Component';

import { eases } from '../utils/easing';

export default class Preload extends Component {
    constructor() {
        super({
            element: '.loader',
            elements: {
                wrapper: '.loader_wrapper',
                logo: '.loader_logo',
                loading: '.loader_loading',
                line: '.loader_line > div',
                percentage: '.loader_percentage',
                copy: '.loader_copy',

                images: document.querySelectorAll('img'),
            },
        });

        this.length = 0;
        this.imageLength = this.elements.images.length;

        setTimeout(() => {
            this.imageLength === 0 ? this.onAssetLoaded() : this.initLoader();
        }, 500);
    }

    initLoader() {
        this.elements.image.forEach((element) => {
            let img = new Image();

            img.onload = () => this.onAssetLoaded();
            img.onerror = (error) => {
                console.warn('You got an error:', error);
                if (error.src === null || error.src === undefined) this.onAssetLoaded();
            };

            img.src = element.getAttribute('src');
        });
    }

    onAssetLoaded() {
        this.length += 1;

        let percent = this.length / this.imageLength;

        if (this.imageLength === 0) percent = 1;

        this.elements.percentage.innerHTML = `${Math.round(percent * 100)}`;
        this.elements.line.style.width = `${Math.round(percent * 100)}%`;

        if (percent === 1) this.emit('completed');
    }

    destroy() {
        GSAP.to(this.elements.wrapper, {
            duration: 0.5,
            autoAlpha: 0,
            ease: eases.circOut,
            onComplete: () => {
                this.element.remove();
            },
        });
    }
}
