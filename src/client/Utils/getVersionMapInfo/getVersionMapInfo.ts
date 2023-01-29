function getVersionMapInfo(map: updateMap) {
    let count = 0;
    let size = 0;
    for (const key in map) {
        if (Object.prototype.hasOwnProperty.call(map, key)) {
            const element = map[key as keyof updateMap];
            count += Object.keys(element).length;
            for (const version in element) {
                if (Object.prototype.hasOwnProperty.call(element, version)) {
                    const data = element[version];
                    size += data.size;
                }
            }
        }
    }
    return {
        count,
        size
    }
}

export default getVersionMapInfo;