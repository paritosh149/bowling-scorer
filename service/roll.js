const { STRIKE, SPARE, OPEN_FRAME, NOT_EVALUATED } = require('../constants/index.js')

module.exports = {
    roll: function (pinsKnockedCount, frames, maxFrames, maxPins) {
        this.isPinsKnockedCountValid(pinsKnockedCount, maxPins);
        this.isRollValid(frames, maxFrames);
        this.setRollRecord(pinsKnockedCount, frames, maxFrames, maxPins);
    },
    setRollRecord: function (pinsKnockedCount, frames, maxFrames, maxPins) {
        const latestFrame = this.getLatestFrame(frames, maxFrames);
        const isLastFrameOfTheGame = this.isLastFrameOfTheGame(frames, maxFrames);
        if (latestFrame.tries.length === 0) {
            // first bowl of the frame
            latestFrame.tries.push(pinsKnockedCount);
            this.setCalloutForFirstBowlOfFrame(pinsKnockedCount, latestFrame, maxPins);
        }
        else if (latestFrame.tries.length === 1
            && (latestFrame.callout !== STRIKE || isLastFrameOfTheGame)) {
            // second bowl of the frame
            this.isSparePinsKnockedCountValid(latestFrame, pinsKnockedCount, maxPins);
            latestFrame.tries.push(pinsKnockedCount);
            this.setCalloutForSecondBowlOfFrame(latestFrame, maxPins);
        }
        else if (isLastFrameOfTheGame
            && latestFrame.tries.length === 2) {
            // third bowl of the frame
            latestFrame.tries.push(pinsKnockedCount);
        }
    },

    setCalloutForFirstBowlOfFrame: function (pinsKnockedCount, latestFrame, maxPins) {
        if (pinsKnockedCount === maxPins) {
            latestFrame.callout = STRIKE;
        }
    },

    setCalloutForSecondBowlOfFrame: function (latestFrame, maxPins) {
        if (latestFrame.tries[0] !== maxPins
            && latestFrame.tries[0] + latestFrame.tries[1] === maxPins) {
            latestFrame.callout = SPARE;
        }
        else if (latestFrame.tries[0] === maxPins) {
            latestFrame.callout = STRIKE;
        }
        else {
            latestFrame.callout = OPEN_FRAME;
        }
    },

    isSparePinsKnockedCountValid: function (latestFrame, pinsKnockedCount, maxPins) {
        if (latestFrame.callout !== 'strike'
            && pinsKnockedCount > maxPins - latestFrame.tries[0]) {
            throw 'Invalid value of pins knocked out.';
        }
    },

    isLastFrameOfTheGame: function (frames, maxFrames) {
        return (frames.length === maxFrames);
    },

    getLatestFrame: function (frames, maxFrames) {
        if ((frames.length === 0 || frames[frames.length - 1].callout !== NOT_EVALUATED)
            && (frames.length < maxFrames)) {
            frames.push({
                tries: [],
                callout: NOT_EVALUATED,
                score: NaN
            });
        }
        return frames[frames.length - 1];
    },

    isRollValid: function (frames, maxFrames) {
        if (frames.length > 0) {
            let latestFrame = frames[frames.length - 1];
            if (frames.length === maxFrames
                && ((latestFrame.tries.length === 3)
                    || (latestFrame.tries.length === 2 && latestFrame.callout === OPEN_FRAME))) {
                throw 'No more rolls allowed.';
            }
        }
    },

    isPinsKnockedCountValid: function (pinsKnockedCount, maxPins) {
        if (pinsKnockedCount > maxPins) {
            throw 'Invalid number of pins knocked out.';
        }
    }
}