interface webSocketState{
    user: {
        name: string
        id: string
    }
    state: "online" | "offline",
    connectedTime: number
}