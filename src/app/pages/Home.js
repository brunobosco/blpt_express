import Page from './Page';

export default class Home extends Page {
    constructor() {
        super({
            id: 'home',

            element: '.home',
            elements: {
                nav: document.querySelector('.nav'),
                nav_links: document.querySelectorAll('.nav_flex-links'),

                hero_title: document.querySelectorAll('.home_hero_title > h1'),
                hero_extra: document.querySelector('.home_hero_extra'),
            },
        });
    }

    create() {
        super.create();
    }
}
