import databaseInfo from "Config/databaseinfo.json"

function loadBehavior(behaviorName: string) {
    return new Promise<behaviorAssetContents>((resolve, reject) => {
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = (e) => {
            const db = dbOpenRequest.result;
            const behaviorStore = db.transaction(databaseInfo.behaviorStore, "readonly").objectStore(databaseInfo.behaviorStore);
            const getRequest = behaviorStore.get(behaviorName);
            getRequest.onsuccess = (e) => {
                const behaviorAssetContents = getRequest.result;
                resolve(behaviorAssetContents);
            }
            getRequest.onerror = (e) => {
                console.error(e);
                reject(e);
            }
        }
    });
}

export default loadBehavior;