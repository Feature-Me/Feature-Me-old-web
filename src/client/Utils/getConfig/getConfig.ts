import { DBVersion, environment, gameConfig, musicSelect, userConfig } from "Utils/Storage/LocalStorage/defaultValue";

function getDBVersion() {
    return JSON.parse(localStorage.getItem("DBVersion") || JSON.stringify(DBVersion));
}


function getEnvironment() {
    return JSON.parse(localStorage.getItem("environment") || JSON.stringify(environment));
}

function getGameConfig() {
    return JSON.parse(localStorage.getItem("gameConfig") || JSON.stringify(gameConfig));
}

function getUserData() {
    return JSON.parse(localStorage.getItem("userData") || JSON.stringify(userConfig));
}

function getSelectedMusic() {
    return JSON.parse(localStorage.getItem("musicSelect") || JSON.stringify(musicSelect));
}

export { getDBVersion, getEnvironment, getGameConfig, getSelectedMusic, getUserData };