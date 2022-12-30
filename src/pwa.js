class PWA {
    constructor() {
        this.deferredPrompt;

        this.init();
        this.detectUpdate();
        this.addEventListener();
    }

    init() {
        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
    }

    async detectUpdate() {
        const registration = await navigator.serviceWorker.ready;
        console.log(registration);

        registration.addEventListener('updatefound', (event) => {
            console.log(event);
            const newSW = registration.installing;
            newSW.addEventListener('statechange', (event) => {
                if (newSW.state == 'installed') {
                    console.log('waiting');
                    // New service worker is installed, but waiting activation
                }
            });
        });
    }

    addEventListener() {
        window.addEventListener('beforeinstallprompt', this.onBeforeIP.bind(this));
    }

    onBeforeIP(e) {
        e.preventDefault();

        this.deferredPrompt = e;
    }
}

// new PWA();
