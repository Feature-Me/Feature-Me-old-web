import * as THREE from "three";
import easing from "Utils/easing/easing";
import { chartCameraEffect, chartEffect, chartSpeedEffect } from "Features/play/parseChart/chartSample";

class effect {
    type: chartEffect["type"];
    time: number;
    constructor(effect: chartEffect) {
        this.type = effect.type;
        this.time = effect.time;
    }
}

class cameraEffect extends effect {
    position: THREE.Vector3Tuple;
    rotation: THREE.Vector3Tuple;
    zoom: number = 1;
    fov: number = 75;
    transitionTime: number = 0;
    //transitionEase: keyof typeof easing | ((pos: number) => number) = "linear";
    transitionEase: ((pos: number) => number) | string = easing.linear;
    constructor(effect: chartCameraEffect) {
        super(effect);

        this.position = effect.position || [0, 0, 0]
        this.rotation = effect.rotation || [0, 0, 0]
        this.zoom = effect.zoom || 1;
        this.fov = effect.fov || 75;
        this.transitionTime = effect.transitionTime || 0;

        if (effect.transitionEase)
            if (effect.transitionEase in easing)
                this.transitionEase = easing[effect.transitionEase as keyof typeof easing] || easing.linear;
            else
                this.transitionEase = effect.transitionEase;
    }
}

class speedEffect extends effect {
    speedType: "absolute" | "relative" | "fixedTime" = "absolute";
    speed: number = 10;
    constructor(effect: chartSpeedEffect) {
        super(effect);
        this.speedType = effect.speedType;
        this.speed = effect.speed;
    }
}


export {
    cameraEffect,
    speedEffect
};