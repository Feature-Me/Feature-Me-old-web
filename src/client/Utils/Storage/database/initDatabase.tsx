import Dexie from "dexie";
import compareVersions from "compare-versions";

import databaseInfo from "Assets/StaticInfo/databaseinfo.json";
import DatabaseError from "Utils/Errors/DatabaseError";

function initDatabase() {
    try {
        if (compareVersions(databaseInfo.version, JSON.parse(localStorage.getItem("DBVersion") || '{version:"0.0.0"}').version) != 1) return;
        console.log("initializing database");

        const db = new Dexie(databaseInfo.DBName);

        let stores: { [key: string]: string } = {};
        for (const key of databaseInfo.databases) {
            stores[key] = "++index";
        }

        db.version(db.verno + 1).stores({ ...stores });
        db.open().then((database) => {
            database.close();
        }).catch(error => { throw new DatabaseError("cannot open database") })

        localStorage.setItem("DBVersion", JSON.stringify({ version: databaseInfo.version, initialized: true, updated: Date.now() }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export default initDatabase;