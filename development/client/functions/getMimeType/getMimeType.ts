import mimeType from "./types.json"
function getMime(file: string): string|false {
    const ext = file.replace(/^.*[\.\/\\]/, '').toLowerCase();
    let mime;
    for (const type in mimeType) {
        // @ts-ignore
        if (mimeType[type].indexOf(ext) > -1) {
            mime = type;
            break;
        }
    }
    return mime || false;
}

export default getMime;