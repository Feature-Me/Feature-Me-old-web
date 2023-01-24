class EventHandler {
    events: { [key: string]: Function[] };
    onceEvents: { [key: string]: Function[] };
    constructor() {
        this.events = {};
        this.onceEvents = {};
    }
    on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    once(event: string, callback: Function) {
        if (!this.onceEvents[event]) {
            this.onceEvents[event] = [];
        }
        this.onceEvents[event].push(callback);
    }
    off(event: string, callback?: Function) {
        if (!callback) {
            this.offEvent(event)
        }
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    offEvent(event: string) {
        if (this.events[event]) {
            delete this.events[event];
        }
    }
    removeAllListeners() {
        this.events = {};
    }
    dispatch(event: string, ...args: any[]) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                callback(...args);
            });
        }
        if(this.onceEvents[event]){
            this.onceEvents[event].forEach(callBack=>{
                callBack(...args);
                this.off(event,callBack);
            })
        }
    }

}

export default EventHandler;