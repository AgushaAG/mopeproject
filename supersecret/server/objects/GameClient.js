const MsgWriter = require("../server/MsgWriter")
const NetworkingTools = require("../tools/NetworkingTools")
const Player = require("./Player")
const Tools = require("../tools/Tools")
class GameClient {
    constructor(socket, room) {
        this.player = null;
        this.socket = socket;
        this.room = room;
    }
    onOpen() {
        console.log("new client")
    }
    onMessage(reader) {
        let type = 0;
        try {
            type = reader.readUInt8()
        } catch {

        }


        switch (type) {
            case 2:


                try {
                    let playerName = reader.readString();

                    console.log("[" + playerName + "]: New player")
                    let isSpectator = reader.readUInt8() == 2;
                    if (isSpectator) {
                        let player = new Player(this.room.object_id, Math.floor(Math.random() * 6841), Math.floor(Math.random() * 6841), playerName.trim(), this)
                            ++this.room.object_id;
                        this.player = player;
                        this.room.addSpectator(this.player);

                    } else {
                        if (this.player.playerName == "agdev") {
                            this.player.playerName = "> AgushaAG - REAL <"
                        }
                        // Set name a player
                        this.player.playerName = playerName.trim() // playerName.trim()
                        this.player.spectator = isSpectator

                        // Set spawn a player
                        this.player.x = 12800 // ThreadLocalRandom.current().nextInt(0, 6841)
                        this.player.y = 12800 // ThreadLocalRandom.current().nextInt(0, 6841)
                            // Zoom
                        this.player.zoom = 3900
                        this.room.initPlayer(this.player);
                    }
                } catch (e) { console.log(e) }
                break;
            case 5:
                try {
                    this.player.mouseX = ((reader.readUInt16()) * 4) || this.player.mouseX;
                    this.player.mouseY = ((reader.readUInt16()) * 4) || this.player.mouseY;
                } catch {}
                break;
            case 19:

                try {
                    if (!this.player.spectator) {

                        if (this.player.chatCooldown > 0) {
                            return this.player.chatCooldown = 1000 / 100
                        }

                        let message = reader.readString().trim().slice(0, 30);

                        console.log("[" + this.player.playerName + "]: " + message)



                        this.player.chatCooldown = 1000 / 100
                        if (message.toLowerCase().startsWith("ani: ")) {
                            let id = parseInt(message.split(" ")[1])
                            if (id < 255 && id > 0) {
                                this.forceAnimal(id)
                            } else {
                                let writer = new MsgWriter();
                                writer.writeUInt8(19);
                                writer.writeUInt32(this.player.id);
                                writer.writeString("i am proxygaymer");
                                this.room.objects.gameMap.forEach((object) => {

                                    if (object.type == 2) {
                                        NetworkingTools.sendMessage(object.client.socket, writer);
                                    }
                                })
                            }

                        } else if (message.toLowerCase().startsWith("tp: ")) {
                            this.player.x = this.player.y = (parseInt(message.split(" ")[1]));
                        } else if (message.toLowerCase().startsWith("kill:")) {
                            this.player.death(0)
                        } else if (message.toLowerCase().startsWith("score: ")) {
                            this.player.score = (parseInt(message.split(" ")[1]));
                        } else if (message.toLowerCase().startsWith("name: ")) {
                            this.player.playerName = (parseInt(message.split(" ")[1]));

                        } else {
                            let writer = new MsgWriter();
                            writer.writeUInt8(19);
                            writer.writeUInt32(this.player.id);
                            writer.writeString(message);
                            this.room.objects.gameMap.forEach((object) => {

                                if (object.type == 2) {
                                    NetworkingTools.sendMessage(object.client.socket, writer);
                                }
                            })
                        }
                    }
                } catch (e) {
                    console.log(e)
                }
                break;
            case 20:
                this.player.holdingW = (reader.readUInt8() == 1);
                break;
            case 21:
                try {
                    this.player.mouseDown = (reader.readUInt8() != 0);
                } catch (e) {
                    this.socket.close();
                }
                break;
            case 255:
                let writer = new MsgWriter()
                writer.writeUInt8(255);
                NetworkingTools.sendMessage(this.socket, writer)
                break;
            default:

                break;
        }
    }
    onClose() {
        console.log("close")
        try {
            this.room.removePlayer(this.player)
        } catch {}
    }
    forceAnimal(id) {
        this.player.animal = id;
        this.player.water = (100);
        this.player.createdAt = (+new Date());
        this.player.flag = (8);
        this.player.score = Tools.getNextAnimalGrowth(this.player)
        NetworkingTools.sendMessage(this.socket, NetworkingTools.upgrade(this.player));
    }
}

module.exports = GameClient;