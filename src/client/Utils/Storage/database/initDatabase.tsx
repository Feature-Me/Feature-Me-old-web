import Dexie from "dexie";
import compareVersions from "compare-versions";

import databaseInfo from "Assets/StaticInfo/databaseinfo.json";
import DatabaseError from "Utils/Errors/DatabaseError";

function initDatabase() {
    return new Promise<void>((resolve, reject) => {
        try {
            if (compareVersions(databaseInfo.version, JSON.parse(localStorage.getItem("DBVersion") || '{version:"0.0.0"}').version) != 1) {
                resolve();
                return;
            }
            const db = new Dexie(databaseInfo.DBName);

            let stores: { [key: string]: string } = {};
            for (const key of databaseInfo.databases) {
                stores[key] = "++index";
            }

            db.version(db.verno + 1).stores({ ...stores });
            db.open().then((database) => {
                database.close();
                localStorage.setItem("DBVersion", JSON.stringify({ version: databaseInfo.version, initialized: true, updated: Date.now() }));
                resolve();
            }).catch(error => {
                reject();
                throw new DatabaseError("cannot open database");
            });


        } catch (error) {
            reject();
        }
    })
}


export default initDatabase;