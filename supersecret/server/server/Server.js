const WebSocket = require("ws");
const MsgReader = require("./MsgReader")

const GameClient = require("../objects/GameClient")



class GameServer {
    constructor(main, port) {
        this.port = port || 7020;
        this.server = new WebSocket.Server({ port: this.port })
        this.sockets = new Map();
        this.main = main;

        this.server.on('connection', (ws) => { this.onConnection(ws) })


    }

    onConnection(ws) {
        console.log("New connection")
        ws.on('message', (msg) => { this.onMessage(ws, msg) })
        ws.on('close', () => { this.onClose(ws) })
        try {
            let id = 1;

            let gameClient = new GameClient(ws, this.main.getRoom(id));
            this.sockets.set(ws, gameClient)

            gameClient.onOpen()

            this.main.handleNewClient(gameClient, this.main.getRoom(id))

        } catch {}



    }


    onMessage(ws, msg) {
        try {
            this.sockets.get(ws).onMessage(new MsgReader(toArrayBuffer(msg)));
        } catch {}
    }

    onClose(ws) {
        try {
            this.sockets.get(ws).onClose();
            this.sockets.delete(ws);
        } catch {}
    }
}

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

module.exports = GameServer