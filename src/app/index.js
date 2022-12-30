import NormalizeWheel from 'normalize-wheel';

import Time from './utils/Time';

import Preloader from './partials/Preloader';

import PageTransition from './animations/PageTransition';
import SmoothScroll from './animations/SmoothScroll';
import Timer from './animations/Timer';

import Home from './pages/Home';

import Observer from './animations/Observer';

class App {
    constructor() {
        this.initPreloader();
        this.initPartials();

        this.initContents();

        this.initPages();

        this.addEventListeners();
        this.addLinkListener();

        this.time = new Time();
        this.time.on('tick', () => {
            this.onUpdate();
        });
    }

    initPartials() {
        this.transition = new PageTransition();
    }

    initPreloader() {
        this.preloader = new Preloader();
        this.preloader.once('completed', this.onPreloaded.bind(this));
    }

    async onPreloaded() {
        this.initAnimations();
        this.preloader.destroy();
    }

    initContents() {
        this.template = document.querySelector('.template');
        this.dataTemplate = this.template.getAttribute('data-template');
    }

    initPages() {
        this.pages = {
            home: new Home(),
        };

        this.page = this.pages[this.dataTemplate];

        switch (true) {
            case this.dataTemplate === 'home':
                console.log('Javascript loaded!');

                break;

            case this.dataTemplate === 'error':
                return;
        }

        this.smoothScroll = new SmoothScroll();
        this.observer = new Observer();
        this.timer = new Timer();
    }

    initAnimations() {
        if (this.dataTemplate === 'error') return;
        if (this.canvas) this.dataTemplate === 'home' ? this.canvas.show() : this.canvas.hide();

        this.page.initIntroAnimation();
        this.page.showIntroAnimation();
    }

    onPopSate() {
        this.onChange({
            url: window.location.pathname,
            push: false,
        });
    }

    async onChange({ url, push = true, page }) {
        await this.transition.show(page);

        const request = await window.fetch(url);

        if (request.status === 200) {
            window.scrollTo(0, 0);

            const html = await request.text();
            const div = document.createElement('div');

            if (push) {
                window.history.pushState({}, '', url);
            }

            div.innerHTML = html;

            const divContent = div.querySelector('.template');
            this.dataTemplate = divContent.getAttribute('data-template');

            this.template.setAttribute('data-template', this.template);
            this.template.innerHTML = divContent.innerHTML;

            this.page = this.pages[this.dataTemplate];

            await this.transition.hide();

            this.initPages();
            this.initAnimations();

            if (this.canvas) this.canvas.onChange();

            this.addLinkListener();
        } else {
            console.log('Error');
        }
    }

    onTouchDown(e) {
        if (this.smoothScroll) this.smoothScroll.onTouchDown(e);
        if (this.canvas) this.canvas.onTouchDown(e);
    }

    onTouchMove(e) {
        if (this.smoothScroll) this.smoothScroll.onTouchMove(e);
        if (this.canvas) this.canvas.onTouchMove(e);
    }

    onTouchUp(e) {
        if (this.smoothScroll) this.smoothScroll.onTouchUp(e);
        if (this.canvas) this.canvas.onTouchUp(e);
    }

    onWheel(e) {
        const normalized = NormalizeWheel(e);

        if (this.smoothScroll && this.smoothScroll.onWheel) this.smoothScroll.onWheel(normalized);
        if (this.canvas && this.canvas.onWheel) this.canvas.onWheel(normalized);
    }

    onUpdate() {
        if (this.smoothScroll) this.smoothScroll.update();
        if (this.canvas && (this.dataTemplate === 'home' || this.dataTemplate === 'poster'))
            this.canvas.update(this.time.elapsed);
    }

    onOrientationChange() {
        location.reload();
    }

    addEventListeners() {
        window.addEventListener('popstate', this.onPopSate.bind(this));

        window.addEventListener('orientationchange', this.onOrientationChange.bind(this));

        window.addEventListener('mousewheel', this.onWheel.bind(this));
        window.addEventListener('wheel', this.onWheel.bind(this));

        window.addEventListener('mousedown', this.onTouchDown.bind(this));
        window.addEventListener('mousemove', this.onTouchMove.bind(this));
        window.addEventListener('mouseup', this.onTouchUp.bind(this));

        window.addEventListener('touchstart', this.onTouchDown.bind(this));
        window.addEventListener('touchmove', this.onTouchMove.bind(this));
        window.addEventListener('touchend', this.onTouchUp.bind(this));
    }

    addLinkListener() {
        const linkProject = document.querySelectorAll('.project_link');

        linkProject.forEach((link) => {
            link.onclick = async (e) => {
                e.preventDefault();

                const { href } = link;
                const pathname = new URL(href).pathname;
                const page = pathname.split('/').pop();

                if (link.classList.contains('menu-link')) {
                    this.menu.close();
                    setTimeout(() => {
                        this.onChange({ url: href, page });
                    }, 1200);

                    return;
                }

                this.onChange({ url: href, page });
            };
        });
    }
}

new App();

//Toggle grid layout GUI
// window.addEventListener('keydown', (e) => {
//     const grid = document.querySelector('.grid');

//     grid.classList.toggle('--active');
// });
