import * as solid from "solid-js";
import * as PIXI from "pixi.js";

import style from "./PointerTracer.module.scss";

import image from "Global/Assets/Images/mouseTrail.png";


const PointerTracer: solid.Component = () => {
    let wrapperRef: HTMLDivElement | undefined;

    const app = new PIXI.Application({
        height: window.innerHeight,
        width: window.innerWidth,
        backgroundAlpha: 0,
        antialias: true
    });
    const trailTexture = PIXI.Texture.from(image);
    const historyX: Array<number> = [];
    const historyY: Array<number> = [];
    // historySize determines how long the trail will be.
    const historySize = 20;
    // ropeSize determines how smooth the trail will be.
    const ropeSize = 100;
    const points: Array<PIXI.Point> = [];
    // Create the rope
    let rope;
    let mouseposition = { x: Infinity, y: Infinity };


    function initRenderer() {
        // Create history array.
        for (let i = 0; i < historySize; i++) {
            historyX.push(0);
            historyY.push(0);
        }
        // Create rope points.
        for (let i = 0; i < ropeSize; i++) {
            points.push(new PIXI.Point(0, 0));
        }
        rope = new PIXI.SimpleRope(trailTexture, points);
        rope.blendMode = PIXI.BLEND_MODES.ADD;
        app.stage.addChild(rope);
    }

    function update() {
        if (!mouseposition) return;

        // Update the mouse values to history
        historyX.pop();
        historyX.unshift(mouseposition.x);
        historyY.pop();
        historyY.unshift(mouseposition.y);
        // Update the points to correspond with history.
        for (let i = 0; i < ropeSize; i++) {
            const p = points[i];

            // Smooth the curve with cubic interpolation to prevent sharp edges.
            const ix = cubicInterpolation(historyX, i / ropeSize * historySize);
            const iy = cubicInterpolation(historyY, i / ropeSize * historySize);

            p.x = ix;
            p.y = iy;
        }

    }

    function clipInput(k: number, arr: Array<number>) {
        if (k < 0) k = 0;
        if (k > arr.length - 1) k = arr.length - 1;

        return arr[k];
    }

    function getTangent(k: number, factor: number, array: Array<number>) {
        return factor * (clipInput(k + 1, array) - clipInput(k - 1, array)) / 2;
    }

    function cubicInterpolation(array: Array<number>, t: number, tangentFactor?: number) {
        const k = Math.floor(t);
        const m = [getTangent(k, tangentFactor ?? 1, array), getTangent(k + 1, tangentFactor ?? 1, array)];
        const p = [clipInput(k, array), clipInput(k + 1, array)];

        t -= k;
        const t2 = t * t;
        const t3 = t * t2;

        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }

    solid.onMount(() => {
        if (wrapperRef) {
            initRenderer();
            wrapperRef.appendChild(app.view as unknown as Node);
        }
        window.addEventListener("pointermove", e => {
            mouseposition.x = e.x;
            mouseposition.y = e.y;
        });

        app.ticker.add(update);
        /* window.addEventListener("pointermove", e => {
            if (wrapperRef) {
                let elem = document.createElement("div");
                elem.style.height = "2px";
                elem.style.width = "2px";
                elem.style.backgroundColor = "white";
                elem.style.position = "fixed";
                elem.style.top = e.y + "px"
                elem.style.left = e.x + "px"
                wrapperRef.appendChild(elem);
 
                setTimeout(() => {
                    wrapperRef?.removeChild(elem)
                }, 500)
            }
        }); */
    });

    return (
        <div class={style.wrapper} ref={wrapperRef}>

        </div>
    )

}
export default PointerTracer;