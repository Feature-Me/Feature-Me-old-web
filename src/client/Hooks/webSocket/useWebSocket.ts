import React from "react";
import * as socketIoClient from "socket.io-client"

const useWebSocket = (url:string) =>{
    const socket = socketIoClient.io(url);
    return socket;
}

export default useWebSocket