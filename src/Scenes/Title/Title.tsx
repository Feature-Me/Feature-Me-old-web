import * as solid from "solid-js";
import { createMotion } from "@motionone/solid";
import { useNavigate } from "@solidjs/router";
import { TbMaximize } from 'solid-icons/tb'
import { useI18nContext } from "Global/Intl/i18n-solid";
import * as THREE from "three";

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';


import style from "./Title.module.scss";
import { BsGear } from "solid-icons/bs";


const Title = () => {

    const { LL, locale } = useI18nContext();

    const navigate = useNavigate();

    let containerRef: HTMLDivElement | undefined;
    let canvasWrapperRef: HTMLDivElement | undefined;
    let camera, renderer, composer: EffectComposer;

    function fullScreen() {
        if (document.fullscreenElement == document.body)
            document.exitFullscreen();
        else document.body.requestFullscreen();
    }

    function intiWebGLRenderer() {
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasWrapperRef?.appendChild(renderer.domElement);
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.setZ(1.5)

        const scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 1000);

        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(1, 1, 1);
        scene.add(light);

        const box = new THREE.Mesh(new THREE.BoxGeometry(20,20,1), new THREE.MeshBasicMaterial({ color: "#f0f0f0", opacity: 0.2, transparent: true }));
        scene.add(box);

        // postprocessing

        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const effect1 = new ShaderPass(DotScreenShader);
        effect1.uniforms['scale'].value = 4;
        composer.addPass(effect1);

        const effect2 = new ShaderPass(RGBShiftShader);
        effect2.uniforms['amount'].value = 0.0005;
        composer.addPass(effect2);

        const effect3 = new OutputPass();
        composer.addPass(effect3);

        animate()
    }

    function animate() {
        requestAnimationFrame(animate);
        composer.render();
    }


    solid.onMount(intiWebGLRenderer)

    return (
        <div class={style.title} ref={containerRef}>
            <div class={style.text}>
                <h1>Feature ME</h1>
                <p>{LL().Scenes.Title.start()}</p>
            </div>
            <div class={style.footer}>
                <p>©2021-{new Date().getFullYear()} The Feature Me Project All rights reserved.</p>
                <div></div>
                <button onClick={fullScreen}>
                    <TbMaximize />
                </button>
                <button class={style.gear}>
                    <BsGear />
                </button>
            </div>
            <div class={style.canvasWrapper} ref={canvasWrapperRef}>

            </div>
        </div>
    )
}

export default Title;