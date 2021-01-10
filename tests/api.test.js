const Game = require('../api/index.js')

describe('first frame', () => {
    const game = new Game(10, 10);
    it('bowls strike & no bonus bowls', () => {

        game.roll(10);

        expect(game.score()).toBe(NaN)
    })

    it('bowls strike & one bonus bowl', () => {

        game.roll(9);

        expect(game.score()).toBe(NaN)
    })

    it('bowls strike & two bonus bowls', () => {

        game.roll(1);

        expect(game.score()).toBe(20)
    })
})

describe('first frame', () => {
    const game = new Game(10, 10);
    it('bowls spare & no bonus bowls', () => {

        game.roll(9);
        game.roll(1);

        expect(game.score()).toBe(NaN)
    })

    it('bowls spare & a bonus bowl', () => {

        game.roll(5);

        expect(game.score()).toBe(15)
    })
})

describe('first frame', () => {
    const game = new Game(10, 10);
    it('bowls to knock down less than 10 pins', () => {

        game.roll(9);

        expect(game.score()).toBe(NaN)
    })

    it('bowls to end open frame', () => {

        game.roll(0);

        expect(game.score()).toBe(9)
    })
})

describe('last frame', () => {
    let game;
    beforeEach(() => {
        game = new Game(10, 10);
        game.roll(10); game.roll(10); game.roll(10);
        game.roll(10); game.roll(10); game.roll(10);
        game.roll(10); game.roll(10); game.roll(10);
    })
    it('bowls strike & no bonus bowls', () => {
        game.roll(10);

        expect(game.score()).toBe(240);

    })

    it('bowls strike & one bonus bowl', () => {
        game.roll(10);
        game.roll(10);

        expect(game.score()).toBe(270);

    })

    it('bowls strike & two bonus bowls', () => {
        game.roll(10);
        game.roll(10);
        game.roll(10);

        expect(game.score()).toBe(300);

    })

    it('bowls spare & no bonus bowls', () => {
        game.roll(8);
        game.roll(2);

        expect(game.score()).toBe(258);

    })

    it('bowls spare & one bonus bowl', () => {
        game.roll(8);
        game.roll(2);
        game.roll(7);

        expect(game.score()).toBe(275);

    })

    it('bowls open frame', () => {
        game.roll(5);
        game.roll(3);

        expect(game.score()).toBe(261);

    })
})