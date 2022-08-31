class EventHandler {
    events: {[key: string]: Function[]};
    constructor(){
        this.events = {};
    }
    on(event: string, callback: Function){
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    off(event: string, callback: Function){
        if(this.events[event]){
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    offEvent(event: string){
        if(this.events[event]){
            delete this.events[event];
        }
    }
    removeAllListeners(){
        this.events = {};
    }
    dispatch(event: string, ...args: any[]){
        if(this.events[event]){
            this.events[event].forEach(callback => {
                callback(...args);
            });
        }
    }

}

export default EventHandler;