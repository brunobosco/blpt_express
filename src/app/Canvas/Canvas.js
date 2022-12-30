import { SphereGeometry, MeshPhysicalMaterial, PointLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

import { lerp, clamp } from '../utils/utility';

import Sizes from '../utils/Sizes';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Scroll from '../animations/Scroll';

export default class Canvas extends Scroll {
    constructor() {
        super({
            selector: document.querySelector('.home_playground'),
            id: 'canvas',
        });

        this.canvas = document.querySelector('.webgl');

        this.sizes = new Sizes();

        this.isEnabled = false;

        this.settings = {
            enableOrbit: false,
            isPoster: null,
        };

        this.colors = {
            black: 0x313131,
            gray: 0xd6dbdd,
            colorfull: 0x2551ef,
        };

        this.scene = new Scene();

        this.initLight();
        this.createMesh();
        this.createCamera();
        this.createRenderer();

        this.sizes.on('resize', () => {
            this.resize();
        });
    }

    show() {
        this.isEnabled = true;
        this.canvas.style.visibility = 'visible';
        this.canvas.style.opacity = '1';
    }

    /*
    Loaders
    */

    initLight() {
        this.sphere = new SphereGeometry(0, 16, 10);

        this.light = {
            colorMid: 0x496242,
            colorTl: 0xffa98b,
            colorBr: 0xcbe2ac,
            colorMid: 0x212121,
            colorTl: 0x212121,
            colorBr: 0x212121,
        };

        this.lightMid = new PointLight(this.light.colorMid, 25, 500);
        // this.lightMid.add(new Mesh(this.sphere, new MeshBasicMaterial({ color: this.light.colorMid })));
        this.lightMid.position.set(0.1, 0.5, 0.5);

        this.lightTl = new PointLight(this.light.colorTl, 30, 500);
        // this.lightTl.add(new Mesh(this.sphere, new MeshBasicMaterial({ color: this.light.colorTl })));
        this.lightTl.position.set(-10, 12, 0.5);

        this.lightBr = new PointLight(this.light.colorBr, 20, 500);
        // this.lightBr.add(new Mesh(this.sphere, new MeshBasicMaterial({ color: this.light.colorBr })));
        this.lightBr.position.set(10, -12, 0.5);

        this.scene.add(this.lightMid);
        this.scene.add(this.lightTl);
        this.scene.add(this.lightBr);
    }

    /*
    Mesh Background
   */

    async createMesh() {
        this.initMaterial();
        await this.init3D();
    }

    initMaterial() {
        this.material = new MeshPhysicalMaterial({
            roughness: 0.3,
            metalness: 1,
            reflectivity: 0.1,
            transmission: 0.23,
            transparent: true,
        });
    }

    init3D() {
        this.gltf = new GLTFLoader().setPath('static/models/');
        this.obj;

        this.model = {
            positionPosterY: -55,
            positionHomeY: 0,
            scalePoster: 1,
            scaleHome: 0.35,
        };

        return this.gltf
            .loadAsync('cozmo.glb', (progress) => {
                //? Callback for loading gltf
                // console.log((progress.loaded / progress.total) * 100 + '% loaded');
            })
            .then(
                (gltf) => {
                    this.obj = gltf.scene;

                    this.obj.position.set(1, this.model.positionHomeY, 1);
                    this.obj.scale.set(0.35, 0.35, 0.35);

                    this.obj.traverse((el) => {
                        el.material = this.material;
                    });

                    this.scene.add(this.obj);
                },
                (error) => {
                    console.log('You got an error:', error);
                }
            );
    }

    //! Poster page - v2 Feature
    //! These methods needs to be called after gltf is loaded - need an async and await
    zoomIn() {
        if (this.obj) {
            this.obj.position.set(1, this.model.positionPosterY, 1);
            this.obj.scale.set(1, 1, 1);
        }
    }

    zoomOut() {
        if (this.obj) {
            this.obj.position.set(1, this.model.positionHomeY, 1);
            this.obj.scale.set(0.35, 0.35, 0.35);
        }
    }

    /*
    Camera
   */

    createCamera() {
        this.initCamera();
        // if (this.settings.enableOrbit) this.initOrbitControls();
    }

    initCamera() {
        this.camera = new PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.2, 1000);
        this.camera.position.set(0, 0, 120);

        this.scene.add(this.camera);
    }

    // initOrbitControls() {
    //     this.controls = new OrbitControls(this.camera, this.canvas);

    //     this.controls.enableDamping = true;
    //     this.controls.enablePan = true;
    //     this.controls.enablePan = false;
    //     this.controls.enableZoom = false;
    //     this.controls.autoRotate = false;

    //     this.controls.minPolarAngle = 1.0;
    //     this.controls.maxPolarAngle = 2.0;
    //     this.controls.minAzimuthAngle = -Math.PI / 1.5;
    //     this.controls.maxAzimuthAngle = Math.PI / 1.5;
    // }

    /*
    Renderer
   */

    createRenderer() {
        this.initRenderer();
    }

    initRenderer() {
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,

            powerPreference: 'low-power',
        });

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio));
        this.renderer.setClearColor(this.colors.black, 0);
    }

    resize() {
        if (this.camera) {
            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();
        }

        if (this.renderer) {
            this.renderer.setSize(this.sizes.width, this.sizes.height);
            this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio));
        }
    }

    /*
    Event Listeners
   */

    onChange() {
        super.onChange();
    }

    onScrollTop() {
        super.onScrollTop();
    }

    onTouchDown(e) {
        super.onTouchDown(e);
    }

    onTouchMove(e) {
        super.onTouchMove(e);
    }

    onWheel(target) {
        super.onWheel(target);
    }

    hide() {
        // this.material.dispose();
        // this.renderer.dispose();
        this.isEnabled = false;
        this.canvas.style.visibility = 'hidden';
        this.canvas.style.opacity = '0';
    }

    update(elapsed) {
        //? Enable update only for home page
        if (!this.isEnabled) return;

        this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target);

        this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);

        this.makeRotation = elapsed * 0.0006;

        if (this.obj) {
            this.obj.rotation.y += 0.2 * 0.1;
            this.obj.rotation.x = Math.cos(this.makeRotation) * 0.2;
            this.obj.rotation.y = Math.sin(this.makeRotation) * 0.2;

            this.obj.position.y = this.model.positionHomeY - this.scroll.current * 0.001;
            this.obj.rotation.y = -this.scroll.current * 0.005;
            this.material.opacity = 1 - this.scroll.current * 0.0025;

            //! Poster page - v2 Feature
            // if (this.settings.isPoster) {
            //     this.obj.position.y = this.model.positionPosterY + this.scroll.current * 0.07;
            // } else {
            //     this.obj.position.y = this.model.positionHomeY - this.scroll.current * 0.001;
            //     this.obj.rotation.y = -this.scroll.current * 0.005;
            //     this.material.opacity = 1 - this.scroll.current * 0.0025;
            // }
        }

        if (this.camera) {
            if (this.settings.enableOrbit) this.controls.update();

            //? Enabling lookAt feature for orbit control on mesh
            if (this.mesh) this.camera.lookAt(this.mesh.position);
        }

        if (this.renderer) this.renderer.render(this.scene, this.camera);

        this.scroll.last = this.scroll.current;
    }

    addEventListeners() {
        //! Need to fix why methods, especially 'onScrollTop', doesn't work on change page.
        //! Seems it can reach or see methods inside the instance when I come back to the home page.
        super.addEventListeners();
    }
}
