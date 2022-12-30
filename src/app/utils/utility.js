import map from 'lodash/map';
import GSAP from 'gsap';

export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

export function lerp2(p1, p2, t) {
    return p1 + (p2 - p1) * t;
}

export function lerp3(a, b, n) {
    return (1 - n) * a + n * b;
}

export function clamp(min, max, number) {
    return GSAP.utils.clamp(min, max, number);
}

export function clamp2(val, min, max) {
    return Math.max(Math.min(val, min), max);
}

export function mapEach(element, callback) {
    if (element instanceof window.HTMLElement) {
        return [callback(element)];
    }

    return map(element, callback);
}

export function canvasNoise() {
    const canvas = document.createElement('canvas');
    canvas.className = 'noise';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    function noise(ctx) {
        let w = ctx.canvas.width,
            h = ctx.canvas.height,
            idata = ctx.createImageData(w, h),
            buffer32 = new Uint32Array(idata.data.buffer),
            len = buffer32.length,
            i = 0;

        for (; i < len; ) buffer32[i++] = ((200 * Math.random()) | 0) << 24;

        ctx.putImageData(idata, 0, 0);
    }

    window.onresize = () => {
        resize();
        noise(ctx);
    };

    let toggle = true;

    // (function loop() {
    //     toggle = !toggle;
    //     if (toggle) {
    //         requestAnimationFrame(loop);
    //         return;
    //     }

    //     requestAnimationFrame(loop);
    // })();

    noise(ctx);
}

export function calcMobileViewport(element) {
    const rootElement = document.querySelector(element);
    const viewportHeight = rootElement.getBoundingClientRect().height;
    const windowtHeight = window.innerHeight;
    const browserBar = viewportHeight - windowtHeight;

    rootElement.style.height = `calc(100vh - ${browserBar}px)`;
}

//? Other utility for safari only media selecotr
// if (navigator.userAgent.search('Safari') >= 0 && navigator.userAgent.search('Chrome') < 0) {
//     document.querySelector(element).className += ' safari';
// }
