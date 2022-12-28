const ProtoEdible = require('./ProtoEdible')

class RedMushroom extends ProtoEdible {
    constructor(id, x, y, radius, room) {
        super(id, x, y, radius, 17, room, null);

    }

    kill(killer) {
        // Do not eat RedMushroom on the next animals
        if (killer.animal >= 4 && killer.animal != 15 && killer.animal != 16 && killer.animal != 17) {
            if (killer.animal == 5 || killer.animal == 19) {
                killer.score = (killer.score + 14);
            } else if (killer.animal == 6 || killer.animal == 20) {
                killer.score = (killer.score + 15);
            } else if (killer.animal == 7 || killer.animal == 21) {
                killer.score = (killer.score + 17);
            } else if (killer.animal == 8 || killer.animal == 22) {
                killer.score = (killer.score + 19);
            } else if (killer.animal == 9 || killer.animal == 23) {
                killer.score = (killer.score + 21);
            } else if (killer.animal == 10 || killer.animal == 24) {
                killer.score = (killer.score + 22);
            } else if (killer.animal == 11 || killer.animal == 25) {
                killer.score = (killer.score + 23);
            } else if (killer.animal == 12 || killer.animal == 26) {
                killer.score = (killer.score + 25);
            } else if (killer.animal == 13 || killer.animal == 27) {
                killer.score = (killer.score + 26);
            } else if (killer.animal == 14 || killer.animal == 28) {
                killer.score = (killer.score + 27);
            } else {
                killer.score = (killer.score + 30);
            }
            //int scr = ThreadLocalRandom.current().nextInt(14);
            killer.score = (killer.score + 14);
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
        let food = new RedMushroom(this.room.object_id, getRandomInt(1800, 6840), getRandomInt(0, 6841), this.radius, this.room);
        //final ProtoEdible food2 = new RedMushroom(this.room.object_id, ThreadLocalRandom.current().nextInt(5040, 6841), ThreadLocalRandom.current().nextInt(0, 6841), this.getRadius(), this.type, this.room);
        this.room.objects.add(food);
        //this.room.objects.add(food2);
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = RedMushroom;