import databaseInfo from "./databaseInfo.json";
import { toast } from "react-toastify";


let DBVersion = (localStorage.getItem("DBVersion") && JSON.parse(localStorage.getItem("DBVersion")!).version + 1) || 1;
function initIndexedDB() {
    const toastId = toast.info("Initializing indexedDB...");
    const databaseRequest = indexedDB.open(databaseInfo.DBName, DBVersion);
    databaseRequest.onupgradeneeded = () => {
        console.log("Database Upgraded");
        try {
            const db = databaseRequest.result;
            const ModelStore = db.createObjectStore(databaseInfo.modelStore, { keyPath: "id" });
            const MusicStore = db.createObjectStore(databaseInfo.musicStore, { keyPath: "id" });
            const ReplayStore = db.createObjectStore(databaseInfo.replayStore, { keyPath: "id",autoIncrement: true });
            db.close();
            localStorage.setItem("DBVersion", JSON.stringify({ version: DBVersion, initiailized: true, updated: new Date().getDate() }));
            toast.success("IndexedDB initialized");
        } catch (error) {
            console.error(error);
            toast.error(`Error in saving resources: ${error}`);
        }
    }
}

export default initIndexedDB;