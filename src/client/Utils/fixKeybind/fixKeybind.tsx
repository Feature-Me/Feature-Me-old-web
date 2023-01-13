function fixKeybind() {
    if (!localStorage.getItem("gameConfig")) return;
    const config = JSON.parse(localStorage.getItem("gameConfig") || "{}");
    if (!("length" in config.gameplay.key)) {
        let newConfig = new Array(7);
        for (const key in config.gameplay.key) {
            if (Object.prototype.hasOwnProperty.call(config.gameplay.key, key)) {
                const element = config.gameplay.key[key];
                newConfig[Number(key)] = element;
            }
        }
        config.gameplay.key = newConfig;
        localStorage.setItem("gameConfig",JSON.stringify(config))
    }
}

export default fixKeybind;