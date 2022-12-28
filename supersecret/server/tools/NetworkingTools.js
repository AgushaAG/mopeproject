const MsgWriter = require("../server/MsgWriter")
const Tools = require("../tools/Tools")
let NetworkingTools = new function() {
    this.initClient = (room) => {
        let writer = new MsgWriter()
        writer.writeUInt8(1)
        writer.writeUInt16(room.playerCount)
        writer.writeUInt8(153)
        return writer;
    }

    this.sendMessage = (socket, message) => {
        socket.send(message.data)
    }

    this.sendJoinPacket = (room, player, i) => {
        let writer = new MsgWriter();
        writer.writeUInt8(2);
        if (room.playerCount >= 200) {
            writer.writeUInt8(0);
        } else {
            writer.writeUInt8(1);
            writer.writeUInt8(i);
            writer.writeUInt32(player.id);
            writer.writeUInt16(room.id);
            writer.writeUInt16(6840);
            writer.writeUInt16(6840);
            writer.writeUInt16(player.x);
            writer.writeUInt16(player.y);
            writer.writeUInt16(player.zoom);
        }
        return writer;
    }

    this.upgrade = (player) => {
        let writer = new MsgWriter();
        writer.writeUInt8(18);
        writer.writeUInt8(player.animal);
        writer.writeUInt32(Tools.getNextAnimalGrowth(player));
        writer.writeUInt8(29 - player.animal);
        for (let i = 0; i < 29 - player.animal; ++i) {
            writer.writeUInt8(29 - i);
        }
        writer.writeUInt8(player.animal - 1);
        for (let i = 1; i < player.animal; ++i) {
            writer.writeUInt8(i);
        }
        writer.writeUInt8(0);
        let edibleAmount = 0;
        if (player.animal >= 1 && player.animal != 5) {
            ++edibleAmount;
        }
        if (player.animal >= 1) {
            ++edibleAmount;
        }
        if (player.animal >= 1) {
            ++edibleAmount;
        }
        if (player.animal >= 4) {
            ++edibleAmount;
        }
        if (player.animal >= 3 && player.animal != 9 && player.animal != 15 && player.animal != 16) {
            ++edibleAmount;
        }
        if (player.animal >= 5 && player.animal != 9 && player.animal != 15 && player.animal != 16 && player.animal != 17 && player.animal != 18) {
            ++edibleAmount;
        }
        writer.writeUInt8(edibleAmount);
        if (player.animal >= 1 && player.animal != 5) {
            writer.writeUInt8(6);
        }
        if (player.animal >= 1) { // Berry (green outline)
            writer.writeUInt8(7);
        }
        if (player.animal >= 1) { // Caviar (green outline)
            writer.writeUInt8(20);
        }
        if (player.animal >= 4 && player.animal != 15 && player.animal != 16 && player.animal != 17) { // Red mushroom (green outline)
            writer.writeUInt8(17);
        }
        // Lillypad (no green outline)
        if (player.animal >= 5 && player.animal != 9 && player.animal != 15 && player.animal != 16 && player.animal != 17 && player.animal != 18) {
            writer.writeUInt8(15);
        }
        if (player.animal >= 3 && player.animal != 9 && player.animal != 15 && player.animal != 16) {
            writer.writeUInt8(8);
        }
        return writer;
    }

    this.updatePlayer = (room) => {
        let writer = new MsgWriter();
        writer.writeUInt8(10);
        writer.writeUInt16(room.playerCount);
        return writer;
    }
    this.sendUpdatePacket = (room, player, first) => {
        let objects = []
        let objectsToUpdate = []
        room.objects.gameMap.forEach((object) => {
            if (object.type == 2 && !object.spectator && !object.hole) {
                objectsToUpdate.push(object);
            } else {
                if (object.type != 2) {
                    objectsToUpdate.push(object);
                }
            }
        })

        player.toAdd.forEach(object => {
            if (object.type == 2 && !(object.spectator)) {
                objects.push(object);
            } else {
                if (object.type != 2) {
                    objects.push(object);
                }
            }
        })

        let writer = new MsgWriter();
        writer.writeUInt8(4);
        writer.writeUInt16(player.x);
        writer.writeUInt16(player.y);
        writer.writeUInt16(player.zoom);
        writer.writeUInt8(player.spectator ? 2 : 1);
        if (!player.spectator) {
            writer.writeUInt8((player.flag == 16) ? player.water : player.water);
            writer.writeUInt32(player.score);
            let percentage = (player.score - player.lastAnimal) / (Tools.getNextAnimalGrowth(player) - player.lastAnimal);
            percentage *= 100.0;
            writer.writeUInt8(Math.min(Math.floor(percentage), 100));
        }
        writer.writeUInt16((first == 1) ? (objects.length + 2) : objects.length);
        objects.forEach(object2 => {
            if (object2.type != 2) {
                writer.writeUInt8(object2.type);
                writer.writeUInt32(object2.id);
                writer.writeUInt16(object2.radius);
                writer.writeUInt16(object2.x);
                writer.writeUInt16(object2.y);
                writer.writeUInt8(0);
            } else {
                if (object2.type == 2) {
                    writer.writeUInt8(object2.type);
                    writer.writeUInt32(object2.id);
                    writer.writeUInt16(object2.radius);
                    writer.writeUInt16(object2.x);
                    writer.writeUInt16(object2.y);
                    writer.writeUInt8(0);
                    writer.writeUInt8((object2).animal);
                    writer.writeString((object2).playerName);
                }
            }
        })
        if (first == 1) {
            writer.writeUInt8(19); // OType
            writer.writeUInt32(0); // ID
            writer.writeUInt16(0); // RAD
            writer.writeUInt16(1800 * 2); // Width
            writer.writeUInt16(6840 * 2);
            writer.writeUInt8(0);
            writer.writeUInt16(900 * 2);
            writer.writeUInt16(3420 * 2);
            writer.writeUInt8(19); // OType
            writer.writeUInt32(1); // ID
            writer.writeUInt16(0); // RAD
            writer.writeUInt16(11880 * 2);
            writer.writeUInt16(6840 * 2);
            writer.writeUInt8(0);
            writer.writeUInt16(900 * 2);
            writer.writeUInt16(3420 * 2);
        }
        writer.writeUInt16(objectsToUpdate.length);
        objectsToUpdate.forEach(object2 => {
            writer.writeUInt32(object2.id);
            writer.writeUInt16(object2.x);
            writer.writeUInt16(object2.y);
            writer.writeUInt16((object2.radius / 4 * 10));
            if (object2.type == 2) {
                let playerObject = object2;
                writer.writeUInt8(playerObject.animal);
                writer.writeUInt16(Tools.getAngle(playerObject, 0));
                writer.writeUInt8(player.flag);
                if ((player.flag >> 0) % 2 != 0) {
                    writer.writeUInt8((player.flag > 2000) ? 1 : 2);
                }
                if ((player.flag >> 5) % 2 != 0) {
                    writer.writeUInt8(100);
                }
            }
        })
        writer.writeUInt16(player.toRemove.length);
        player.toRemove.forEach(object2 => {
            writer.writeUInt32(object2.id);
            let objectToMoveTo = object2;
            if (player.removalMap.get(object2) != null) {
                objectToMoveTo = player.removalMap.get(object2);
            }
            writer.writeUInt8(1);
            writer.writeUInt32(objectToMoveTo.id);
        })
        player.toAdd = []
        player.toRemove = []
        player.removalMap = new Map();
        return writer;
    }

    this.sendLeaderboard = (toSend, playerA) => {
        let writer = new MsgWriter();
        writer.writeUInt8(8);
        playerA.rank = toSend.indexOf(playerA) + 1
        writer.writeUInt8(playerA.rank);
        if (toSend.includes(playerA)) {
            writer.writeUInt8(toSend.length);
        } else {
            writer.writeUInt8(toSend.length + 1);
        }

        let toSendLimit = toSend.slice(0, 9)
        toSendLimit.forEach((player2, i) => {
            writer.writeUInt8(i + 1);
            writer.writeString(player2.playerName);
            writer.writeUInt32(player2.score);
        })
        if (!toSendLimit.includes(playerA)) {
            writer.writeUInt8(playerA.rank);
            writer.writeString(playerA.playerName);
            writer.writeUInt32(playerA.score);
        }
        return writer;
    }

    this.sendDeath = (player, reason) => {
        let writer = new MsgWriter();
        writer.writeUInt8(14);
        writer.writeUInt8(reason);
        player.score = (Math.round(player.score / 2.5));
        writer.writeUInt32(player.score);
        if (reason === 0) {
            writer.writeString(player.playerName)
        }
        return writer;
    }

}

const pointInRect = ({ x1, y1, x2, y2 }, { x, y }) => (
    (x > x1 && x < x2) && (y > y1 && y < y2)
)

module.exports = NetworkingTools;