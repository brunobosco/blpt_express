import EventEmitter from './EventEmitter';

export default class Resize extends EventEmitter {
    constructor() {
        super();

        this.width = innerWidth;
        this.height = innerHeight;

        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        this.resize();
    }

    resize() {
        window.addEventListener('resize', () => {
            this.width = innerWidth;
            this.height = innerHeight;

            this.pixelRatio = Math.min(window.devicePixelRatio, 2);

            this.trigger('resize');
        });
    }
}
