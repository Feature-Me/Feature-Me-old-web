type versionMap = {
    [key: string]: { url: string, size: number, hash: string }
}

interface updateMap {
    background: versionMap
    behavior: versionMap
    music: versionMap
}