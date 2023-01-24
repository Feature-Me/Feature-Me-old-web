import databaseInfo from "Config/databaseinfo.json"

function deleteDatabase(){
    const dbOpenRequest = indexedDB.deleteDatabase(databaseInfo.DBName)
}

export default deleteDatabase;