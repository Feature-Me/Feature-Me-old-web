type refType = { [key: string]: { url: string, size: number, hash: string } }
interface keys {
    name: string,
    path: string
    ext: string
    url: string
    ref: refType
}
type keyType = Array<keys>