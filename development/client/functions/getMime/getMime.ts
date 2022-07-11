import mimedb from 'mime-db';

function getMimeFromFileName(path:string):string {
    if(!path) return "";
    const ext = path.split(".").pop();
    console.log(path,ext);
    for(let key in mimedb){
        if(!mimedb[key].extensions) continue;
        if(mimedb[key].extensions.includes(ext)){
            return key;
        }
    }
    return "";
}
export default getMimeFromFileName;