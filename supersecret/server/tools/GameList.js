class GameList {
    constructor() {
        this.gameMap = new Map();

    }

    get(id) {
        return this.gameMap.get(id)
    }

    add(object) {
        this.gameMap.set(object.id, object)
    }


    remove(object) {
        this.gameMap.delete(object.id)
    }

    clear() {
        this.gameMap.clear();
    }
}

module.exports = GameList