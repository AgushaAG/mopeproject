const GameObject = require('./GameObject')

class ProtoEdible extends GameObject {

    constructor(id, x, y, radius, type, room, origin) {
        super(id, x, y, radius, type);
        this.room = room;
        this.origin = origin;
        //console.log(this.room.objects)

    }


    update() {

        this.room.objects.gameMap.forEach((object) => {
            if (object.type == 2 && !object.spectator && object.flag != 16 && this.room.collisionTest(this, object)) {
                this.kill(object);
            } else {
                if (object.type == 2 || object.type == 10 || object.id == this.id || object.type == 6 || object.type == 13) {
                    return;
                }
                if (object.type == 11) {
                    // Mud (�����)
                    return;
                }
                if (object.type == 14) {
                    // Lake (�����)
                    return;
                }
                if (object.type == 16) {
                    // Island (������)
                    return;
                }
                if (!object.type) {
                    this.room.collision(object, this);
                }
            }
        })
        if (this.x >= 6840 * 4 - this.radius) {
            this.x = (6840 * 4 - this.radius - 1);
        }
        if (this.y >= 6840 * 4 - this.radius) {
            this.y = (6840 * 4 - this.radius - 1);
        }
    }

    kill(killer) {

        // Deer �� ����� ���� �����
        if (killer.animal != 5) {
            let scr = getRandomInt(1, 3)
                //killer.score = (killer.score + 1);
            killer.score = (killer.score + scr);

            this.room.objects.remove(this);


            this.room.objects.gameMap.forEach((player) => {
                if (player.type == 2) {
                    player.removalMap.set(this, killer);
                    player.toRemove.push(this);
                }
            })
            this.respawn();
        }
    }

    respawn() {
        if (this.origin != null) {
            let origin2;
            origin = origin2 = this.origin;
            --origin2.amount;
        } else {
            let food = new ProtoEdible(this.room.object_id, getRandomInt(0, 6841 * 4), getRandomInt(0, 6841 * 4), this.radius, this.type, this.room, this.origin);
            this.room.objects.add(food);
            let room2;
            let room = room2 = this.room;
            ++room2.object_id;
            this.room.objects.gameMap.forEach((player) => {
                if (player.type == 2) {
                    player.toAdd.push(food);
                }
            })
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = ProtoEdible;