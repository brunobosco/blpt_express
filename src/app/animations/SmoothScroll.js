import { lerp2, clamp } from 'utils/utility';
import Scroll from 'animations/Scroll';

export default class SmoothScroll extends Scroll {
    constructor() {
        super({
            selector: document.querySelector('[data-smoothscroll]'),
            id: 'smooth',
        });

        this.nav = document.querySelector('.nav');
        this.navLinks = this.nav.querySelector('.nav_links');
        this.navMenu = this.nav.querySelector('.nav_menu');

        this.worksHeroFigure = document.querySelector('.works_hero_media_figure');
        this.worksHeroImage = document.querySelector('.works_hero_media_image');
    }

    //? --Methods--
    initMobile() {
        super.initMobile();
    }

    //? --EventListeners--
    onScrollTop() {
        super.onScrollTop();
    }

    onResize() {
        super.onResize();

        //? I've placed this calculation only here cause it induce an error on Canvas. Just a memo for the future!
        this.scroll.limit = this.containerHeight - window.innerHeight;
    }

    onTouchDown(e) {
        super.onTouchDown(e);
    }

    onTouchMove(e) {
        super.onTouchMove(e);
    }

    onTouchUp() {}

    onWheel(target) {
        super.onWheel(target);
    }

    update() {
        this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target);

        this.scroll.current = lerp2(this.scroll.current, this.scroll.target, this.scroll.ease);
        this.scroll.current = parseFloat(this.scroll.current.toFixed(2));

        this.selector.style.transform = `translate3d(0, ${-this.scroll.current}px, 0)`;

        if (this.worksHeroImage) this.worksHeroImage.style.transform = `scale(${this.scroll.current * 0.001 + 1.2})`;
        if (this.worksHeroFigure)
            this.worksHeroFigure.style.borderRadius = `0 0 ${this.scroll.current * 0.032}rem ${
                this.scroll.current * 0.032
            }rem`;

        this.scroll.last = this.scroll.current;
    }

    addEventListeners() {
        window.addEventListener('resize', this.onResize.bind(this));
        super.addEventListeners();
    }
}
