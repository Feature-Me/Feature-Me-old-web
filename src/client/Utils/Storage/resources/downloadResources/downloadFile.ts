import JSZip from "jszip";
import IntegrityError from "Utils/Errors/fileIntegrityError";

function downloadResourceFile(url: string, hash?: string) {
    return new Promise<JSZip>(async (resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/zip",
            },
            redirect: "follow",
            mode: "cors"
        })
            .then(res => { if (res.ok) return res.arrayBuffer(); else throw new Error(res.statusText) })
            .then(async res => {
                if (hash) {
                    //get hash
                    const hashData = await window.crypto.subtle.digest("SHA-256", res);
                    const hashString = Array.from(new Uint8Array(hashData)).map(x => x.toString(16).padStart(2, "0")).join("");
                    if (hashString != hash) {
                        throw new IntegrityError("hash did not match");
                    }
                }
                JSZip.loadAsync(res).then(zip => {
                    if (!zip.file("FileMap.json")) throw new IntegrityError("FileMap not found");
                    resolve(zip);
                })
            }).catch(error => {
                console.error(error);
                reject(error);
            });
    })
}

export default downloadResourceFile;