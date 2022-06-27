import TranslateText from "global/TranslateText/translateText";
import React from "react";
import { toast } from "react-toastify";
function notification (content: string): void  {
    toast.success(<TranslateText contentData={content} />);
}
export default {
    enviroment: (notificationFlag?:boolean):void => {
        localStorage.removeItem("environment");
        if(!notificationFlag) notification("cacheController.delete.environment");
    },
    resources: (notificationFlag?: boolean):void => {
        localStorage.removeItem("ResourcesDownloaded");
        localStorage.removeItem("DBVersion");
        const deleteDBRequest = indexedDB.deleteDatabase("ResourcesDatabase");
        deleteDBRequest.onsuccess = ():void => {
            if(!notificationFlag) notification("cacheController.delete.resources");
        }
        deleteDBRequest.onerror = (error):void => {
            console.error(error);
            if(!notificationFlag) notification("cacheController.error.resources" );
        }
    },

}