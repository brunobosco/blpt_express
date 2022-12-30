import { lerp, clamp2 } from 'utils/utility';
export default class Slider {
    constructor() {
        this.element = document.querySelector('[data-slider]');

        this.media = document.querySelectorAll('.slider_media');
        this.sliderProgress = document.querySelector('.slider_info p');
        this.figures = this.element.querySelectorAll('figure');

        this.touchbar = document.querySelector('.slider_touchbar');

        this.body = document.querySelector('body');

        this.isEnabled = false;

        this.state = {
            isScrollable: false,
            enableUI: true,

            progress: 0,
        };

        this.options = {
            ease: 0.095,
            dragSpeed: 3,
        };

        this.controls = {
            bounds: {},
            current: 0,
            last: 0,
            dragStart: 0,
            dragEnd: 0,
        };

        this.isMobile = window.matchMedia('(max-width: 769px)').matches;

        this.init();
        this.addEventListeners();
    }

    init() {
        this.controls.bounds = this.element.getBoundingClientRect();

        this.items = [];
        [...this.figures].forEach((el) => {
            const bounds = el.getBoundingClientRect();

            this.items.push({
                figure: el,
                img: el.querySelector('img'),
                bounds,
                x: 0,
                length: el.length,
            });
        });

        this.onResize();
    }

    updateUI() {
        const min = 0;
        const max = -this.controls.bounds.width - this.controls.bounds.left + window.innerWidth;

        this.state.progress = ((this.controls.last - min) * 100) / (max - min) / 100;
        this.progress = this.state.progress * 100;

        this.sliderProgress.innerHTML = `${Math.round(this.progress)}`;
    }

    onResize() {
        this.controls.bounds = this.element.getBoundingClientRect();
    }

    onMouseLeave(e) {
        this.state.isScrollable = false;

        this.element.classList.remove('slider-on');
        this.body.classList.remove('isDraggable');
    }

    onTouchUp(e) {
        this.state.isScrollable = false;
        this.controls.dragEnd = this.controls.current;

        this.element.classList.remove('slider-on');
        this.body.classList.remove('isDraggable');

        if (this.isMobile) this.isEnabled = false;
    }

    onTouchDown(e) {
        const x = e.touches ? e.touches[0].clientX : e.clientX;

        this.state.isScrollable = true;
        this.controls.dragEnd = this.controls.current;
        this.controls.dragStart = x;

        this.element.classList.add('slider-on');
        this.body.classList.add('isDraggable');

        if (this.isMobile) this.isEnabled = true;
    }

    onTouchMove(e) {
        if (!this.state.isScrollable) return;

        const x = e.touches ? e.touches[0].clientX : e.clientX;

        this.controls.current = this.controls.dragEnd + (x - this.controls.dragStart) * this.options.dragSpeed;
        this.controls.current = clamp2(
            this.controls.current,
            0,
            -this.controls.bounds.width - this.controls.bounds.left + window.innerWidth
        );
    }

    update() {
        this.controls.last = lerp(this.controls.last, this.controls.current, this.options.ease);
        this.controls.last = parseFloat(this.controls.last).toFixed(2);

        this.element.style.transform = `translate3d(${this.controls.last}px, 0, 0)`;

        //? images
        if (this.state.enableUI && this.sliderProgress) this.updateUI();
    }

    addEventListeners() {
        window.addEventListener('resize', this.init.bind(this));

        this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));

        this.element.addEventListener('mousedown', this.onTouchDown.bind(this));
        this.element.addEventListener('mousemove', this.onTouchMove.bind(this));
        this.element.addEventListener('mouseup', this.onTouchUp.bind(this));

        this.touchbar.addEventListener('touchstart', this.onTouchDown.bind(this));
        this.touchbar.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.touchbar.addEventListener('touchend', this.onTouchUp.bind(this));
    }
}
