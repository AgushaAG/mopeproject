let Tools = new function() {

    this.getNextAnimalGrowth = (player) => {
        switch (player.animal) {
            case 1:
                return 50;

            case 2:
                return 200;

            case 3:
                return 450;

            case 4:
                return 1000;

            case 5:
                return 2100;

            case 6:
                return 4200;

            case 7:
                return 7900;

            case 8:
                return 15000;

            case 9:
                return 28500;

            case 10:
                return 54000;

            case 11:
                return 105000;

            case 12:
                return 200000;

            case 13:
                return 550000;

            case 30:
                return 100000000;

            case 15:
                return 50;

            case 16:
                return 200;

            case 17:
                return 450;

            case 18:
                return 1000;

            case 19:
                return 2100;

            case 20:
                return 4200;

            case 21:
                return 7900;

            case 22:
                return 15000;

            case 23:
                return 28500;

            case 24:
                return 54000;

            case 25:
                return 105000;

            case 26:
                return 200000;

            case 27:
                return 350000;

            case 28:
                return 500000;

            case 29:
                return 990000;

            case 33:
                return 105000;

            default:
                return 100000000;
        }
    }

    this.getAngle = (player, a) => {
        let angle = Math.toDegrees(Math.atan2(player.mouseY - player.y, player.mouseX - player.x));
        angle -= a;
        if (angle < 0) {
            angle += 360;
        }
        if (angle > 360) {
            angle = 0;
        }
        return angle;
    }


    this.getMinSize = (player) => {
        switch (player.animal) {
            case 1:
                return 42;
            case 2:
                return 42;
            case 3:
                return 65;
            case 4:
                return 65;
            case 5:
                return 70;
            case 6:
                return 70;
            case 7:
                return 70;
            case 8:
                return 80;
            case 9:
                return 85;
            case 10:
                return 87;
            case 11:
                return 90;
            case 12:
                return 95;
            case 13:
                return 80;
            case 14:
                return 130;
            case 15:
                return 40;
            case 16:
                return 40;
            case 17:
                return 55;
            case 18:
                return 60;
            case 19:
                return 70;
            case 20:
                return 70;
            case 21:
                return 55;
            case 22:
                return 60;
            case 23:
                return 50;
            case 24:
                return 45;
            case 25:
                return 60;
            case 26:
                return 62;
            case 27:
                return 65;
            case 28:
                return 68;
            case 29:
                return 130;
            case 30:
                return 260;
            case 32:
                return 400;
            case 33:
                return 50;
            default:
                return 42;
        }
    }
    this.getNextLogicalAnimal = (player) => {
        if (player.animal == 30 && player.score >= 100000000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Black Dragon!" + " ID: " + player.id);
            return 32;
        }
        if (player.animal == 28 && player.score >= 500000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Giant squid!" + " ID: " + player.id);
            return 29;
        }
        if (player.animal == 27 && player.score >= 350000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Killer Whale!" + " ID: " + player.id);
            return 28;
        }
        if (player.animal == 26 && player.score >= 200000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Highbrow Bottlenose!" + " ID: " + player.id);
            return 27;
        }
        if (player.animal == 25 && player.score >= 105000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Dugong!" + " ID: " + player.id);
            return 26;
        }
        if (player.animal == 24 && player.score >= 54000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Dolphin!" + " ID: " + player.id);
            return 25;
        }
        if (player.animal == 23 && player.score >= 28500) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Pufferfish!" + " ID: " + player.id);
            return 24;
        }
        if (player.animal == 22 && player.score >= 15000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Jellyfish!" + " ID: " + player.id);
            return 23;
        }
        if (player.animal == 21 && player.score >= 7900) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Sea-Horse!" + " ID: " + player.id);
            return 22;
        }
        if (player.animal == 20 && player.score >= 4200) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Turtle!" + " ID: " + player.id);
            return 21;
        }
        if (player.animal == 19 && player.score >= 2100) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Stingray!" + " ID: " + player.id);
            return 20;
        }
        if (player.animal == 18 && player.score >= 1000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Shark!" + " ID: " + player.id);
            return 19;
        }
        if (player.animal == 17 && player.score >= 450) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Squid!" + " ID: " + player.id);
            return 18;
        }
        if (player.animal == 16 && player.score >= 200) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Crab!" + " ID: " + player.id);
            return 17;
        }
        if (player.animal == 15 && player.score >= 50) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Trout!" + " ID: " + player.id);
            return 16;
        }
        if (player.score >= 10000000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Dragon!" + " ID: " + player.id);
            return 30;
        }
        if (player.score >= 5000000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Dragon!" + " ID: " + player.id);
            return 34;
        }
        if (player.score >= 550000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Dragon!" + " ID: " + player.id);
            return 14;
        }
        if (player.score >= 200000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Hippo!" + " ID: " + player.id);
            return 13;
        }
        if (player.score >= 105000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Rhino!" + " ID: " + player.id);
            return 12;
        }
        if (player.score >= 54000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Crocodile!" + " ID: " + player.id);
            return 11;
        }
        if (player.score >= 28500) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Bear!" + " ID: " + player.id);
            return 10;
        }
        if (player.score >= 15000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Cheetah!" + " ID: " + player.id);
            return 9;
        }
        if (player.score >= 7900) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Lion!" + " ID: " + player.id);
            return 8;
        }
        if (player.score >= 4200) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Zebra!" + " ID: " + player.id);
            return 7;
        }
        if (player.score >= 2100) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Mole!" + " ID: " + player.id);
            return 6;
        }
        if (player.score >= 1000) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Deer!" + " ID: " + player.id);
            return 5;
        }
        if (player.score >= 450) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Fox!" + " ID: " + player.id);
            return 4;
        }
        if (player.score >= 200) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Pig!" + " ID: " + player.id);
            return 3;
        }
        if (player.score >= 50 && player.animal == 1) {
            console.log(String.valueOf(player.playerName) + " Upgraded to Rabbit!" + " ID: " + player.id);
            return 2;

        }

        return 1;
    }
}


Math.toDegrees = (radians) => {
    var pi = Math.PI;
    return radians * (180 / pi);
}

module.exports = Tools;