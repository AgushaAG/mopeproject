const ProtoGenerator = require("./ProtoGenerator");
const ProtoEdible = require("./ProtoEdible");

class BerrySpot extends ProtoGenerator {
    constructor(id, x, y, radius, type, room) {
    	super(id, x, y, radius, 5);
    		this.cooldown = 0;
    		this.room = room;
    }

    update() {
    	++this.cooldown;
    	if (this.amount < 25 && this.cooldown >= 25) {
    		this.cooldown = 0;
    		++this.amount;
    		let x = getRandomInt(this.x - this.radius, this.x + this.radius);
    		let y = getRandomInt(this.y - this.radius, this.y + this.radius);
    		let radius = getRandomInt(0, 1) ? 40 : 48;
    		let object = new ProtoEdible(this.room.object_id, x, y, radius, 6, this.room, this);
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

module.exports = BerrySpot;