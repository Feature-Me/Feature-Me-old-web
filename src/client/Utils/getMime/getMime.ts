import mimedb from 'mime-db';

function getMime(path: string): string {
    if (!path) return "";
    const ext = path.split(".").pop()!;
    for (let key in mimedb) {
        const data = mimedb[key];
        if (!data.extensions) continue;
        else if (data.extensions!.includes(ext)) {
            return key;
        }
    }
    return "";
}
export default getMime;