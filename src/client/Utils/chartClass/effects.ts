import * as THREE from "three";
import easing from "Utils/easing/easing";
import { chartCameraEffect, chartEffect, chartSpeedEffect } from "Utils/parseChart/chartSample";

class effect {
    type: chartEffect["type"];
    time: number;
    constructor(effect: chartEffect) {
        this.type = effect.type;
        this.time = effect.time;
    }
}

class cameraEffect extends effect {
    position: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    zoom:number = 1;
    fov: number = 70;
    transitionTime:number = 0;
    //transitionEase: keyof typeof easing | ((pos: number) => number) = "linear";
    transitionEase: ((pos: number) => number) | string = easing.linear;
    constructor(effect: chartCameraEffect) {
        super(effect);
        if(effect.position)
            this.position = new THREE.Vector3(effect.position[0], effect.position[1], effect.position[2]);

        if(effect.rotation)
            this.rotation = new THREE.Vector3(effect.rotation[0], effect.rotation[1], effect.rotation[2]);

        if(effect.zoom)
            this.zoom = effect.zoom;

        if(effect.fov)
            this.fov = effect.fov;

        if(effect.transitionTime)
            this.transitionTime = effect.transitionTime;

        if(effect.transitionEase)
            if(effect.transitionEase in easing)
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