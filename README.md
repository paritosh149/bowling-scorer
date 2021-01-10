# Bowling scorer :bowling:

## Introduction
This API is created in Javascript and runs on NodeJS (tested on version 15.4.0). It's main objective is to accept number of pins knocked down in each chance, and return score on demand.

---
Example Scorecard
|     |     |     |     |     |     |     |     |     |     |
|-----|----:|----:|----:|----:|----:|----:|----:|----:|----:|
| 6 1 | 7 2 | X   | 9 / | X   | X   | X   | - - | 8 / | X 9 / |
|   7 |  16 |  36 |  56 |  86 | 106 | 116 | 116 | 136 |   156 |

---

## Requirements

Requirements of this solution are based on [DiUS - Coding Test](https://github.com/DiUS/coding-tests/blob/master/dius_bowling.md)

## Project Folder Structure
    .
    ├── config/                  # Configuration files
    ├── api/                     # API Source files
    ├── tests/                   # Automated tests
    ├── index.js                 # Entry point
    ├── package.json
    └── README.md

## API

    1. Import and create instance of Game class

        const Game = require('./api/index.js')
        const game = new Game();

    2. Update Game with pins knocked out in current try. Note that the rolls must be in order.

        game.roll(pinsCount)

        No return in case of valid roll supplied.

        Exceptions: 
            a. Invalid value of pins knocked out.
            b. No more rolls allowed.
            c. Invalid number of pins knocked out.

    3. Calculate and get the current score of this game. Note that score is NaN in case bonus rolls are yet not supplied.

        game.score()

        Returned value is either a number or NaN.
## How to run

### Pre-requisites
    - [ ] Node JS version 14.x.x or above must be installed

### Steps

1. Clone this repo to a local directory

    ```git clone https://github.com/paritosh149/bowling-scorer.git your-local-directory```

2. Go to your local directory

    ```cd your-local-directory```

3. Install test dependencies (if test cases are to be executed)

    ```npm i```

4. Run the app

    ```npm start```

5. Run tests

    ```npm test```

## To Do (Pending Tasks)
- [x] First to Second Last frame - Strike, Spare and Open Frame
- [x] Last Frame - Strike , Spare and Open Frame
- [x] Perfect score of 300 handled
- [x] Test cases
- [ ] Supply all rolls in a single new API - Milestone V2
- [ ] Display formatted scorecard - Milestone V2
