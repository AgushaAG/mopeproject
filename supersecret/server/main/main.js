const GameServer = require("../server/Server")
const Room = require("../world/Room")
const NetworkingTools = require("../tools/NetworkingTools")

let Main = new function() {
    this.rooms = []
    for (i = 1; i < 2; ++i) {
        this.rooms.push(new Room(i, this))
    }
    this.getRoom = function(id) {
        return this.rooms[id - 1]
    }

    this.handleNewClient = function(client, room) {
        client.socket.send(NetworkingTools.initClient(room).data)
    }
    this.server = new GameServer(this);
}