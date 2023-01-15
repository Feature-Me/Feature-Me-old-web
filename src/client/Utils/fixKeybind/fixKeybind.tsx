function fixKeybind() {
    if (!localStorage.getItem("gameConfig")) return;
    const config = JSON.parse(localStorage.getItem("gameConfig") || "{}");
    if (!("length" in config.gameplay.key)) {
        let newConfig = Object.values(config.gameplay.key);
        config.gameplay.key = newConfig;
        localStorage.setItem("gameConfig", JSON.stringify(config))
    }
}

export default fixKeybind;