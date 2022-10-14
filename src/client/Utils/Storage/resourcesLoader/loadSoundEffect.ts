import databaseInfo from "Config/databaseinfo.json"

function loadSoundEffect(behaviorName: string) {
    return new Promise<soundEffectAssetContents>((resolve, reject) => {
        const dbOpenRequest = indexedDB.open(databaseInfo.DBName);
        dbOpenRequest.onsuccess = (e) => {
            const db = dbOpenRequest.result;
            const soundEffectStore = db.transaction(databaseInfo.soundEffectStore, "readonly").objectStore(databaseInfo.soundEffectStore);
            const getRequest = soundEffectStore.get(behaviorName);
            getRequest.onsuccess = (e) => {
                const soundEffectAssetContents = getRequest.result as soundEffectAssetContents;
                resolve(soundEffectAssetContents);
            }
            getRequest.onerror = (e) => {
                console.error(e);
                reject(e);
            }
        }
    });
}

export default loadSoundEffect;