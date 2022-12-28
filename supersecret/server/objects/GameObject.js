class GameObject {
    constructor(id, x, y, radius, type, velocityX, velocityY) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.id = id;
        this.velocityX = velocityX || 0;
        this.velocityY = velocityY || 0;
    }

    update() {
        this.x = (this.x + this.velocityX);
        this.y = (this.y + this.velocityY);
        if (this.x >= 6840 * 4 - this.radius) {
            this.x = 6840 * 4 - this.radius - 1;
        }
        if (this.y >= 6840 * 4 - this.radius) {
            this.y = 6840 * 4 - this.radius - 1;
        }
    }

}

module.exports = GameObject;