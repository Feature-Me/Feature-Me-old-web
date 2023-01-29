type versionData = {
    [key: string]: { url: string, size: number, hash: string }
}

interface updateMap {
    background: versionData
    behavior: versionData
    music: versionData
}