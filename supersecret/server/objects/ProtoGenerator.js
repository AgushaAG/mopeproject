const GameObject = require('./GameObject')

class ProtoGenerator extends GameObject {
    constructor(id, x, y, radius, type) {
        super(id, x, y, radius, type);
        this.amount = 0;
    }
}

module.exports = ProtoGenerator