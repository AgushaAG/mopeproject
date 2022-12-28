const GameObject = require('./GameObject')
const NetworkingTools = require("../tools/NetworkingTools")
const Tools = require("../tools/Tools");
const RedMushroom = require('./RedMushroom');

class Player extends GameObject {
    constructor(id, x, y, playerName, client) {
        super(id, x, y, 42, 2);
        this.score = 0;
        this.cooldown = 0;
        this.rank = 0;
        this.zoom = 3900;
        this.angle = 0;
        this.tier = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.animal = 1;
        this.water = 100;
        this.health = 100;
        this.waterTimer = 25;
        this.spectator = true;
        this.mouseDown = false;
        this.airLevel = 100;
        this.airTimer = 25;
        this.flag = 8;
        this.holdingW = false;
        this.lastAni = 0;
        this.inWater = false;
        this.first = 1;
        this.water_pending_removal = 0;
        this.inHole = false;
        this.hole = 0;
        this.createdAt = +new Date()
        this.lastUpdate = +new Date()
        this.toAdd = []
        this.toRemove = []
        this.removalMap = new Map()
        this.spawned = true;
        this.client = client;
        this.playerName = playerName;
        this.speed = 15;
        this.velocityX = 0;
        this.velocityY = 0;
        this.passThrough = false;
        this.hoverOver = false;
        this.chatCooldown = 1000 / 100;
        this.isCharging = false;
        this.chargeSpeed = 15;
        this.boostCooldown = 0;
        this.shotFires = 0;
    }

    reset() {
        this.zoom = 3900;
        this.angle = 0;
        this.flag = 8;
        this.rank = 0;
        this.first = 1;
        this.spawned = true;
        this.cooldown = 0;
        this.createdAt = +new Date();
        this.mouseDown = false;
        this.mouseX = 0;
        this.inHole = false;
        this.hole = 0;
        this.mouseY = 0;
        this.water = 100;
        this.health = 100;
        if (!this.spectator)
            this.client.forceAnimal(30)
            //this.animal = (Math.random ? 1 : 15;
    }

    update() {
        if (this.spectator) {

        } else {

            if (this.animal < 29 && this.score >= Tools.getNextAnimalGrowth(this)) {
                this.lastAni = Tools.getNextAnimalGrowth(this);
                this.animal = Tools.getNextLogicalAnimal(this);
                this.water = 100;
                this.createdAt = +new Date()
                this.flag = 8;
                try {
                    NetworkingTools.sendMessage(this.client.socket, NetworkingTools.upgrade(this));
                } catch {}
            }

            if (this.cooldown > 0) {
                this.cooldown--;
            }
            if (this.chatCooldown > 0) {
                this.chatCooldown--;
            }
            if (this.boostCooldown > 0) {
                this.boostCooldown--;
            }
            if (this.animal == 12 && this.cooldown <= 0 && this.holdingW) {
                this.cooldown = 500;
                this.isCharging = true;
                let c = setInterval(function() {
                    this.chargeSpeed++;
                }.bind(this), 100)
                setTimeout(function() {
                    clearInterval(c)
                    this.isCharging = false;
                    this.chargeSpeed = 15;

                }.bind(this), 5000)
            }

            if (this.animal == 30 && this.cooldown <= 0 && this.holdingW) {
                this.cooldown = 1

                let shootFrom = { x: this.x + (Math.cos(Math.toRadians(this.angle) - Math.PI)), y: this.y + (Math.sin(Math.toRadians(this.angle) - Math.PI)) }
                let abilSpeed = 100;
                for (let i = 0; i < 10; i++) {
                    let obj = new GameObject(this.client.room.object_id, shootFrom.x, shootFrom.y, 50, 18)
                    let storeAngle = (this.angle + 50 / 2) - (5 * i)
                        ++this.client.room.object_id;
                    this.client.room.objects.add(obj);

                    this.client.room.objects.gameMap.forEach((player) => {
                        if (player.type == 2) {
                            player.toAdd.push(obj);
                        }
                    })



                    let a = setInterval(function() {
                        if (abilSpeed > 0)
                            abilSpeed -= 1;

                        obj.velocityX = ((Math.cos(Math.toRadians(storeAngle)) * abilSpeed));
                        obj.velocityY = ((Math.sin(Math.toRadians(storeAngle)) * abilSpeed));
                        this.client.room.objects.gameMap.forEach((o) => {
                            if (obj.id != o.id) {
                                if (o.type != 2 && o.type != 18 && o.type == 3)
                                    this.client.room.collision(o, obj);
                            }
                        })
                    }.bind(this), 1000 / 10)

                    setTimeout(function() {
                        clearInterval(a)
                        this.client.room.objects.remove(obj)
                        this.client.room.objects.gameMap.forEach((player) => {
                            if (player.type == 2) {
                                player.toRemove.push(obj);
                                player.removalMap.set(obj, player);

                            }
                        })

                    }.bind(this), 3000)
                }
            }

            if (this.animal == 14 && this.cooldown <= 0 && this.holdingW) {
                this.cooldown = 45

                let shootFrom = { x: this.x + (Math.cos(Math.toRadians(this.angle) - Math.PI)), y: this.y + (Math.sin(Math.toRadians(this.angle) - Math.PI)) }
                let abilSpeed = 60;
                for (let i = 0; i < 1; i++) {
                    let obj = new GameObject(this.client.room.object_id, shootFrom.x, shootFrom.y, 25, 18)


                    let storeAngle = this.angle
                        ++this.client.room.object_id;
                    this.client.room.objects.add(obj);


                    this.client.room.objects.gameMap.forEach((player) => {
                        if (player.type == 2) {
                            player.toAdd.push(obj);
                        }
                    })

                    this.client.room.objects.gameMap.forEach((o) => {
                        if (obj.id != o.id) {
                            if (o.type != 2 && o.type != 18 && o.type == 3)
                                this.client.room.collisionDynamic(obj, o);
                        }
                    })
                    let b = setInterval(function() {
                        if (abilSpeed > 0)
                            abilSpeed -= 5;

                        obj.velocityX = ((Math.cos(Math.toRadians(storeAngle)) * abilSpeed));
                        obj.velocityY = ((Math.sin(Math.toRadians(storeAngle)) * abilSpeed));
                    }.bind(this), 1000 / 10)

                    setTimeout(function() {
                        clearInterval(b)
                        this.client.room.objects.remove(obj)
                        this.client.room.objects.gameMap.forEach((player) => {
                            if (player.type == 2) {
                                player.toRemove.push(obj);
                                player.removalMap.set(obj, player);

                            }
                        })

                    }.bind(this), 3000)


                }
            }

            if (this.animal == 32 && this.cooldown <= 0 && this.holdingW) {
                this.cooldown = 1

                let shootFrom = { x: this.x + (Math.cos(Math.toRadians(this.angle) - Math.PI)), y: this.y + (Math.sin(Math.toRadians(this.angle) - Math.PI)) };
                for (let j = 0; j < 3; j++) {
                    let abilSpeed = 120 - 10 * j
                    for (let i = 0; i < 10; i++) {
                        let obj = new GameObject(this.client.room.object_id, shootFrom.x, shootFrom.y, 50, 18)
                        let storeAngle = (this.angle + 50 / 2) - (5 * i)
                            ++this.client.room.object_id;
                        this.client.room.objects.add(obj);

                        this.client.room.objects.gameMap.forEach((player) => {
                            if (player.type == 2) {
                                player.toAdd.push(obj);
                            }
                        })



                        let a = setInterval(function() {
                            if (abilSpeed > 0)
                                abilSpeed -= 1;

                            obj.velocityX = ((Math.cos(Math.toRadians(storeAngle)) * abilSpeed));
                            obj.velocityY = ((Math.sin(Math.toRadians(storeAngle)) * abilSpeed));
                            this.client.room.objects.gameMap.forEach((o) => {
                                if (obj.id != o.id) {
                                    if (o.type != 2 && o.type != 18 && o.type == 3)
                                        this.client.room.collision(o, obj);
                                }
                            })
                        }.bind(this), 1000 / 10)

                        setTimeout(function() {
                            clearInterval(a)
                            this.client.room.objects.remove(obj)
                            this.client.room.objects.gameMap.forEach((player) => {
                                if (player.type == 2) {
                                    player.toRemove.push(obj);
                                    player.removalMap.set(obj, player);

                                }
                            })

                        }.bind(this), 3000)
                    }
                }
            }
            this.zoom = 3900;
            let percentage = (this.score - this.lastAni) / (Tools.getNextAnimalGrowth(this) - this.lastAni);
            percentage *= 100.0;

            if (this.animal >= 29) {
                percentage = 100.0;
            }
            let radius = (Tools.getMinSize(this) + Math.round(percentage) / 30);
            this.radius = (radius);
            this.zoom -= radius * 10;

            this.x += this.velocityX;
            this.y += this.velocityY;

            this.passThrough = (this.animal == 14) || this.animal == 30 || this.animal == 32
            this.hoverOver = (this.animal == 14) || this.animal == 30 || this.animal == 32
            this.client.room.objects.gameMap.forEach((o) => {
                if (this.id != o.id) {
                    switch (o.type) {
                        case 2:
                            if (!this.passThrough)
                                this.client.room.collision(o, this);
                            break;
                        case 3:
                            if (!this.hoverOver) {
                                this.client.room.collision(o, this);
                            }
                            break;
                        default:
                            break;
                    }
                }
            })



            if ((this.flag == 16 && !this.holdingW) || !this.inWater && this.flag == 16)
                this.flag = 0



            this.mouseDown ? this.speed = 50 : this.speed = 15

            // this.isCharging ? this.speed = this.chargeSpeed : this.speed = 15
            /*
            if (this.boostCooldown <= 0 && this.mouseDown) {
                this.speed = 50
                this.boostCooldown = 30
                setTimeout(function() {
                    this.speed = 15;
                }.bind(this), 150)
            }*/


            //this.angle = lerp(Tools.getAngle(this, 0));

            if (this.water <= 0)
                this.health--;
            if (this.health <= 0)
                this.death(1)
            this.angle = Tools.getAngle(this, 0)
            this.velocityX = ((Math.cos(Math.toRadians(this.angle)) * this.speed));
            this.velocityY = ((Math.sin(Math.toRadians(this.angle)) * this.speed));

            if (this.x < 7100 || this.x > 20100)
                this.inWater = true;
            else
                this.inWater = false;


            if (this.inWater && this.water <= 100)
                this.water += 0.5;
            if (this.water > 0)
                this.water -= this.mouseDown ? 0.1 : 0.05

    }
        if (this.animal == 32)
            this.zoom = 1200;
        if (this.x >= 6840 * 4 - this.radius) {
            this.x = (6840 * 4 - this.radius - 1);
        }
        if (this.y >= 6840 * 4 - this.radius) {
            this.y = (6840 * 4 - this.radius - 1);
        }

        if (this.holdingW && this.inWater) {
            if (this.animal != 30) {
                this.flag = 16;
            }
        }

        this.lastUpdate = +new Date()
        NetworkingTools.sendMessage(this.client.socket, NetworkingTools.sendUpdatePacket(this.client.room, this, this.first));
        this.first = 0;
    }

    death(reason) {
        this.client.room.killPlayer(this, reason)
    }
}

Math.toRadians = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = Player;