//@ts-ignore
function getExtension(path: string):string {
    if (!path) return "";
    const ext = path.split(".").pop()!;
    return ext;
}

export default getExtension;