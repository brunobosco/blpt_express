export default class Timer {
    constructor() {
        this.element = document.querySelector('.timer');
        this.clock = this.element.querySelector('.timer_clock');

        this.now = new Date().getTime();
        this.interval = 0;

        setInterval(() => {
            this.render();
        }, 1000);
    }

    render() {
        const options = { timeZone: 'Europe/Rome', timeZoneName: 'short' };
        const now = new Date();

        this.clock.innerHTML = now.toLocaleTimeString('it-IT', options);
    }

    destroy() {
        this.element.remove();
    }
}
