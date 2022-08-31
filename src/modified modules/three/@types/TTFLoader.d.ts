import { Loader, LoadingManager } from '../../../src/Three';

export interface FontObject {
    glyphs: {};
    familyName: string;
    ascender: number;
    descender: number;
    underlinePosition: any;
    underlineThickness: any;
    boundingBox: {
        xMin: number;
        yMin: number;
        xMax: number;
        yMax: number;
    };
    resolution: number;
    original_font_information: any;
}

export class TTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    reversed: boolean;

    //added loadFromBase64
    loadFromBase64(base64: string, onLoad: (json: FontObject) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    //added loadFromBase64Async
    loadFromBase64Async(base64: string, onProgress?: (event: ProgressEvent) => void): Promise<FontObject>;

    //added loadFromArrayBuffer
    loadFromArrayBuffer(buffer: ArrayBuffer, onLoad: (json: FontObject) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;

    //added loadFromArrayBufferAsync
    loadFromArrayBufferAsync(buffer: ArrayBuffer, onProgress?: (event: ProgressEvent) => void): Promise<FontObject>;

    load(
        url: string,
        onLoad: (json: FontObject) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void,
    ): void;
    loadAsync(url: string, onProgress?: (event: ProgressEvent) => void): Promise<FontObject>;

    parse(arraybuffer: ArrayBuffer): FontObject;
}
