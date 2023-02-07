import databaseInfo from "Assets/StaticInfo/databaseinfo.json";
function deleteDatabase() {
    indexedDB.deleteDatabase(databaseInfo.DBName);
}

export default deleteDatabase;