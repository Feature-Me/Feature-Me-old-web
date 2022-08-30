declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.ico";
declare module "*.mp3";
declare module '*.scss' {
    const exports: {
        [exportName: string]: string
    };
    export = exports
}
declare module '*.css' {
    const exports: {
        [exportName: string]: string
    };
    export = exports
}