declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module '*.scss' {
    const exports: {
        [exportName: string]: string
    };
    export = exports
};