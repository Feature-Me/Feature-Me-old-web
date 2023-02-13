import exportLocalStorage from "./exportLocalStorage";

function downloadLocalStorage() {
    const data = exportLocalStorage();
    const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([BOM, data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FeatureMe0_7_0_settings.fmcfg`;
    a.click();
}

export default downloadLocalStorage;