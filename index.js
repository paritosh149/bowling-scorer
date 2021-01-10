const Game = require('./api/index.js')
const Config = require('./config/index.json')
const game = new Game(Config.maxFrames, Config.maxPins);

game.roll(10);
game.roll(10);
game.roll(10);

game.roll(10);
game.roll(10);
game.roll(10);

game.roll(10);
game.roll(10);
game.roll(10);

game.roll(10);
game.roll(10);
game.roll(10);

const score = game.score();
console.log("Score is: " + score);
