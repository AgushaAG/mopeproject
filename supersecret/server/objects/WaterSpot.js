const ProtoGenerator = require('./ProtoGenerator')
const Water = require('./Water')


class WaterSpot extends ProtoGenerator {


    constructor(id, x, y, radius, room) {
        super(id, x, y, radius, 4);
        this.cooldown = 0;
        this.room = room;
    }

    update() {
        ++this.cooldown;
        if (this.amount < 10 && this.cooldown >= 25) {
            this.cooldown = 0;
            ++this.amount;
            let x = getRandomInt(this.x - this.radius, this.x + this.radius);
            let y = getRandomInt(this.y - this.radius, this.y + this.radius);
            let object = new Water(this.room.object_id, x, y, 42, 7, this.room, this);
            let room2;
            let room = room2 = this.room;
            ++room2.object_id;
            this.room.objects.add(object);
            this.room.objects.gameMap.forEach((player) => {
                if (player.type == 2) {
                    player.toAdd.push(object);
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

module.exports = WaterSpot;