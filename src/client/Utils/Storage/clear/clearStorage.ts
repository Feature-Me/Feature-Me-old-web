import deleteDatabase from "../database/deleteDatabase";
import { deleteLocalStorage } from "../LocalStorage/deleteLocalStorage";

function clearStorage() {
    deleteLocalStorage();
    deleteDatabase();
}

export default clearStorage;