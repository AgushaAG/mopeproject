const GameList = require("../tools/GameList")
const NetworkingTools = require("../tools/NetworkingTools")
const GameObject = require("../objects/GameObject")
const RedMushroom = require("../objects/RedMushroom")
const WaterSpot = require("../objects/WaterSpot")
const Melon = require("../objects/Melon")
class Room {
    constructor(id, main) {
        this.objects = new GameList();
        this.object_id = 2;
        this.leaderboard = []
        this.id = id;
        this.playerCount = 69;
        this.main = main;
        this.generate()

        setInterval(function() {
            this.update()
        }.bind(this), 1000 / 30)

        setInterval(function() {
            this.updateLeaderboard()
            this.updatePlayerCount();
        }.bind(this), 2000)

    }

    addObj(obj) {
        this.objects.add(obj)

        this.objects.gameMap.forEach((o) => {
            if (o.type == 2)
                o.toAdd.push(obj);
        })
    }
    generate() {
        for (let i = 0; i < 200; ++i) {
            let size = getRandomInt(0, 1) ? 150 : 260; // 150 : 200
            this.objects.add(new GameObject(this.object_id, getRandomInt((0 + size) * 4, (6840 - size) * 4 + 1), getRandomInt(0, (6840 - size) * 4 + 1), size, 3));
            ++this.object_id;
        }

        for (let i = 0; i < 150; ++i) {
            let size = 75
            this.objects.add(new RedMushroom(this.object_id, getRandomInt((0 + size) * 4, (6840 - size) * 4 + 1), getRandomInt(0, (6840 - size) * 4 + 1), size, this));
            ++this.object_id;
        }

        for (let i = 0; i < 30; ++i) {
            let size = 230
            this.objects.add(new WaterSpot(this.object_id, getRandomInt((0 + size) * 4, (6840 - size) * 4 + 1), getRandomInt(0, (6840 - size) * 4 + 1), size, this));
            ++this.object_id;
        }

        for (let i = 0; i < getRandomInt(3, 5); ++i) {
            this.objects.add(new GameObject(this.object_id, ((6840 / 2) + getRandomInt(-500, 500)) * 4, ((6840 / 2) + getRandomInt(-400, 400)) * 4, 1000, 33));
            ++this.object_id;
        }

        for (let i = 0; i < 10; ++i) {
            let size = 75
            this.objects.add(new Melon(this.object_id, ((6840 / 2) + getRandomInt(-500, 500)) * 4, ((6840 / 2) + getRandomInt(-400, 400)) * 4, size, this));
            ++this.object_id;
        }

        this.objects.add(new GameObject(this.object_id, (6840 / 2) * 4, (6840 / 2) * 4, 2000, 49));
        ++this.object_id;
        this.objects.add(new GameObject(this.object_id, ((6840 / 2)) * 4, ((6840 / 2) - 12.5) * 4, 180, 44));
        ++this.object_id;
        this.objects.add(new GameObject(this.object_id, (6840 / 2) * 4, (6840 / 2) * 4, 1000, 26));
        ++this.object_id;
        this.objects.add(new GameObject(this.object_id, (6840 / 2) * 4, (8000 / 2) * 4, 1000, 48));
        ++this.object_id;


    }
    addSpectator(player) {
        this.objects.add(player);
        player.velocityX = 2;
        player.velocityY = 2;
        player.reset();

        NetworkingTools.sendMessage(player.client.socket, NetworkingTools.sendJoinPacket(this, player, 2));


        this.objects.gameMap.forEach((o) => {
            player.toAdd.push(o);
        })
    }
    removePlayer(player) {
        this.objects.remove(player);
        if (!player.spectator) {
            this.objects.gameMap.forEach((object) => {

                    if (object.type == 2) {
                        object.toRemove.push(player);
                        object.removalMap.set(player, player);
                    }
                })
                //player.reset();
                //player.setSpectator(true);
        }
    }
    killPlayer(player, reason) {
        this.objects.gameMap.forEach((player2) => {
            if (player.type == 2) {
                player.toRemove.push(player);
                player.removalMap.set(player, player2);

            }
        })

        NetworkingTools.sendMessage(player.client.socket, NetworkingTools.sendDeath(player, reason));
    }
    initPlayer(player) {
        player.reset();

        NetworkingTools.sendMessage(player.client.socket, NetworkingTools.sendJoinPacket(this, player, 1));
        NetworkingTools.sendMessage(player.client.socket, NetworkingTools.upgrade(player));
        this.objects.gameMap.forEach((o) => {
            player.toAdd.push(o);
        })

        this.objects.gameMap.forEach((o) => {
            if (o.type == 2) {
                o.toAdd.push(player);
            }
        })
        this.updatePlayerCount();
        this.updateLeaderboard()
    }
    updatePlayerCount() {
        let players = 0;

        for (let k of this.objects.gameMap.values()) {
            if (k.type == 2) {
                players++;
            }
        }
        this.playerCount = players;
        this.objects.gameMap.forEach((object) => {
            if (object.type == 2) {
                NetworkingTools.sendMessage(object.client.socket, NetworkingTools.updatePlayer(this));
            }
        })
    }

    update() {
        this.objects.gameMap.forEach((object) => {
            object.update();


        })


        //this.updateLeaderboard();


    }

    updateLeaderboard() {
        let players = [...this.objects.gameMap].map(([name, value]) => (value)).filter(object => object.type == 2 && object.spectator == false).sort(function(a, b) {
            return a.score - b.score;
        }).reverse()
        this.objects.gameMap.forEach((player) => {
            if (player.type == 2) {
                NetworkingTools.sendMessage(player.client.socket, NetworkingTools.sendLeaderboard(players, player))
            }
        })
    }
    collision(entity1, entity2) {
        let dx = entity2.x - entity1.x;
        let dy = entity2.y - entity1.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (entity1.radius + entity2.radius >= dist) {
            if (dist <= 0.0) {
                dist = 1.0;
            }
            let nx = dx / dist;
            let ny = dy / dist;
            entity2.x = ((entity1.x + nx * (entity1.radius + entity2.radius)));
            entity2.y = ((entity1.y + ny * (entity1.radius + entity2.radius)));
        }
    }

    collisionDynamic(entity1, entity2) {
        let dx = entity2.x - entity1.x;
        let dy = entity2.y - entity1.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (entity1.radius + entity2.radius >= dist) {
            if (dist <= 0.0) {
                dist = 1.0;
            }
            let nx = dx / dist;
            let ny = dy / dist;
            let distB1 = dist * (entity1.radius / (entity1.radius + entity2.radius));
            let cx = entity1.x + nx * distB1;
            let cy = entity1.y + ny * distB1;
            entity1.x = ((cx - nx * entity1.radius));
            entity1.y = ((cy - ny * entity1.radius));
            entity2.x = ((cx - nx * entity2.radius));
            entity2.y = ((cy - ny * entity2.radius));
        }
    }

    collisionTest(object1, object) {
        let dx = object1.x - object.x;
        let dy = object1.y - object.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        return object.radius + object1.radius >= dist;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Room;