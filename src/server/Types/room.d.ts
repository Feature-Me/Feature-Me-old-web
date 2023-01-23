interface multiPlayerRoom {
    name: string
    id: string
    invite: string,
    users: Array<wsUser>
    owner: wsUser
}