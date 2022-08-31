class renderingStatus {
    fps = {
        current: 0,
        min: 0,
        max: 0,
        avg:0
    }
    latency = {
        current: 0,
        min: 0,
        max: 0,
        avg:0
    }
    time={
        current:0,
        last:0,
    }

    constructor() {
        this.time.current = this.getNow();
    }

    getNow() {
        return performance.now() || Date.now();
    }

    update() {
        this.time.last = this.time.current;
        this.time.current = this.getNow();

        this.latency.current = this.time.current - this.time.last;
        this.latency.min = Math.min(this.latency.min, this.latency.current);
        this.latency.max = Math.max(this.latency.max, this.latency.current);

        if (this.time.current - this.time.last > 1000) {
            this.fps.current = this.fps.current / (this.time.current - this.time.last) * 1000;
            this.fps.min = Math.min(this.fps.min, this.fps.current);
            this.fps.max = Math.max(this.fps.max, this.fps.current);
            this.fps.avg = (this.fps.avg + this.fps.current) / 2;
        }
    }

}

export default renderingStatus;