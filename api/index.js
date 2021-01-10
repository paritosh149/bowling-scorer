const { DEFAULT_MAX_FRAMES, DEFAULT_MAX_PINS } = require('../constants/index.js')
const rollService = require('../service/roll.js')
const scoreService = require('../service/score.js')

class Game {
    constructor(maxFrames = DEFAULT_MAX_FRAMES, maxPins = DEFAULT_MAX_PINS) {
        this.maxFrames = maxFrames,
            this.maxPins = maxPins,
            this.frames = []
    }
    roll(pinsKnockedCount) {
        rollService.roll(pinsKnockedCount, this.frames, this.maxFrames, this.maxPins);
    };
    score() {
        return scoreService.score(this.frames, this.maxPins);
    }


}
module.exports = Game;
