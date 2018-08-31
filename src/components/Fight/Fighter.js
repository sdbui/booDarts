const MAX_HEALTH = 15;
const BASE_POINT_FOR_HIT = 10;
class Fighter {
    constructor(name) {
        this.name = name;
        this.health = MAX_HEALTH;
        this.targets = [];
        this.setRandomTargets();
        this.score = 0;
        this.isCurrent = false;
    }
    hello() {
        console.log(`hello! My name is ${this.name}`)
    }
    hit(multiplier=1) {
        this.health -= multiplier;
        if(this.health <=0) {
            this.score = 0;
            this.health = 0;
        }
    }
    heal(multiplier=1) {
        if(this.health === MAX_HEALTH) return;
        this.health +=multiplier;
    }

    addPoint(multiplier=1) {
        this.score += (multiplier * BASE_POINT_FOR_HIT);
    }

    setRandomTargets() {
        this.targets = [];
        for(let i=0;i<3;i+=1) {
            let r = null;
            while(r === null || this.targets.includes(r)) {
                r = randomNumber(20)
            }
            this.targets.push(r)
        }
    }

}

// return number from 0 to but not including, max
function randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max)) + 1;
}


export default Fighter;