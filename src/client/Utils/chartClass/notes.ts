import * as THREE from "three";
import easing from "../easing/easing";

import { chartBrightNote, chartDamageTapNote, chartFlickNote, chartHoldNote, chartNote, chartSeedNote, chartTapNote } from "../parseChart/chartSample";

class note {
    type:chartNote["type"];
    script: Array<string>;
    note: THREE.Object3D;
    transitionEase: ((pos: number) => number) | string;
    constructor(note: chartNote) {
        this.type = note.type;
        this.script = note.script || [];
        this.note = new THREE.Object3D();
        this.transitionEase = note.transitionEase || easing.linear;
    }
    judge(time: number) {

    }
    setBehavior(behavior: THREE.Object3D) {
        this.note = behavior;
    }
}

class tapNote extends note {
    lane: 1 | 2 | 3 | 4;
    time: number;
    constructor(note: chartTapNote) {
        super(note);
        this.lane = note.lane;
        this.time = note.time;
    }
}

class damageTapNote extends note {
    lane: 1 | 2 | 3 | 4;
    time: number;
    constructor(note: chartDamageTapNote) {
        super(note);
        this.lane = note.lane;
        this.time = note.time;
    }
}

class holdNote extends note {
    lane: 1 | 2 | 3 | 4;
    startTime: number;
    endTime: number;
    constructor(note: chartHoldNote) {
        super(note);
        this.lane = note.lane;
        this.startTime = note.startTime;
        this.endTime = note.endTime;
    }
}

class brightNote extends note {
    time: number;
    constructor(note: chartBrightNote) {
        super(note);
        this.time = note.time;
    }
}

class seedNote extends note {
    lane: "left" | "right";
    time: number;
    constructor(note: chartSeedNote) {
        super(note);
        this.lane = note.lane;
        this.time = note.time;
    }
}

class flickNote extends note {
    lane: "left" | "right";
    time: number;
    direction: "left" | "right";
    constructor(note: chartFlickNote) {
        super(note);
        this.lane = note.lane;
        this.time = note.time;
        this.direction = note.direction;
    }
}

export {
    tapNote,
    damageTapNote,
    holdNote,
    brightNote,
    seedNote,
    flickNote
}