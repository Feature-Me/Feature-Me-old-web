function mimeToExtension(mime: string) {
    if (!(/[data:]?[^;.]\/([^;,]+)[,]?/.test(mime))) return;
    return mime.replace(/[data:]?[^;,]*\//, "").replace(/[;]?base64[,]?/, "");
}

export default mimeToExtension;