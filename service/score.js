const { STRIKE, SPARE, NOT_EVALUATED } = require('../constants/index.js')

module.exports = {
    score: function (frames, maxPins) {
        let finalScore = NaN;
        frames.forEach((frame, frameIndex) => {
            if (frame.callout === NOT_EVALUATED)
                return;
            let localScore = NaN;
            let previousScore = 0;
            let bonusScore = NaN;
            localScore = Math.min(maxPins, frame.tries.reduce((a, b) => a + b, 0)); // local score
            let triesRequired = 0;
            if (frameIndex > 0) { // previous score
                previousScore = frames[frameIndex - 1].score;
            }
            if (frame.callout === STRIKE) {
                // add next two tries
                const LAST_FRAME_STRIKE_BONUS_TRIES = 2
                bonusScore = this.fetchBonusScore(frames, frameIndex, 0, LAST_FRAME_STRIKE_BONUS_TRIES);
            } else if (frame.callout === SPARE) {
                // add next one try
                const LAST_FRAME_SPARE_BONUS_TRIES = 1
                bonusScore = this.fetchBonusScore(frames, frameIndex, 1, LAST_FRAME_SPARE_BONUS_TRIES);
            }
            else {
                bonusScore = 0;
            }
            frame.score = localScore + previousScore + bonusScore;
            finalScore = !isNaN(frame.score) ? frame.score : finalScore;
        })
        return finalScore;
    },

    fetchBonusScore: function (frames, startingFrameIndex, startingTryIndex, requiredBowlCount) {


        let bowls = this.fetchBonusBowls(frames, startingFrameIndex, startingTryIndex, requiredBowlCount);
        if (bowls.length < requiredBowlCount) {
            return;
        }
        return bowls.reduce((a, b) => a + b, 0); // add bonus score

    },

    fetchBonusBowls: function (frames, startingFrameIndex, startingTryIndex, requiredBowlCount) { // starting next frame
        let nextBowls = [];
        let currentFrameIndex = startingFrameIndex;
        let currentTryIndex = startingTryIndex;

        while (currentFrameIndex < frames.length && nextBowls.length < requiredBowlCount) {
            const currentFrame = frames[currentFrameIndex];
            // check if frame is to be moved
            if (currentTryIndex + 1 === currentFrame.tries.length) {
                currentFrameIndex++;
                currentTryIndex = -1;
                continue;
            }
            nextBowls = nextBowls.concat(currentFrame.tries.slice(currentTryIndex + 1));
            nextBowls.splice(requiredBowlCount);
            currentTryIndex++;
        }
        return nextBowls;
    }
}
