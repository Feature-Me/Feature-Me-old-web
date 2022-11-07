import { FontObject } from "three/examples/jsm/loaders/TTFLoader"

interface fontAssetContents {
    name:string
    data:FontObject
}

type fontTable = Array<{name:string,label:string,color:string}>
