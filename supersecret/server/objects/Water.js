const ProtoEdible = require('./ProtoEdible')

class Water extends ProtoEdible {
    constructor(id, x, y, radius, type, room, gen) {
        super(id, x, y, radius, type, room, gen);
    }

    kill(killer) {
        if (killer.water < 100) {
            killer.water = (killer.water + 3);
            this.room.objects.remove(this);
            this.room.objects.gameMap.forEach((player) => {
                if (player.type == 2) {
                    player.removalMap.set(this, killer);
                    player.toRemove.push(this);
                }
            })
            if (this.origin != null) {
                let origin2;
                let origin = origin2 = this.origin;
                --origin2.amount;
            }
        }
    }
}

module.exports = Water;