#Chess Battles

[Link to live App](http://ec2-52-15-238-17.us-east-2.compute.amazonaws.com/)


Main Functionality
---
Play a game of Chess with a twist! There are different classes in the game, where each class has it's own unique moves. We keep track of how well you're doing by recording your wins and losses.

![]

User actions
---
* Signup
* Login
* Search for a game against another player

Classes
---
###Conqueror - King
* Has one extra move vertically, and horizontally
* The extra move is considered a hop, and lets the King jump over pieces like the Knight
![Conqueror](./client/images/cb-conqueror.gif)

###Knight - Knight
* The knight can now move in the tile between it's regular moveset
![Knight](./client/images/cb-knight.gif)

Pieces
---
Each piece is an object, where its valid moves are saved to an array that corresponds to the engine array.
```
export class Knight extends Piece {
    constructor(team, type) {
        super(team, type)
        this.team === 1 ? this.name = 'whiteKnight' : this.name = 'blackKnight'
    }
    findValidMoves() {
        if(this.type) {
            let boundsIndex = convertBounds(board[this.position].rankFile)
            let possibleMoves = [boundsIndex+21, boundsIndex+12, boundsIndex-8, boundsIndex-19, boundsIndex-21, boundsIndex-12, boundsIndex+8, boundsIndex+19, boundsIndex+20, boundsIndex-20, boundsIndex-2, boundsIndex+2 ]
            //Remove out of bounds
            possibleMoves = possibleMoves.map(int => {if(!isOffBoard(int)) return convertBoard(int)}).filter(int => int !== undefined)
            //Check for teamate/enemy
            possibleMoves = possibleMoves.map(int => {
                if(!board[int].piece) return int
                else if(!this.isSameTeam(board[int].piece.team)) return int
            }).filter(int => int !== undefined)

            return possibleMoves
        }else {
            let boundsIndex = convertBounds(board[this.position].rankFile)
            let possibleMoves = [boundsIndex+21, boundsIndex+12, boundsIndex-8, boundsIndex-19, boundsIndex-21, boundsIndex-12, boundsIndex+8, boundsIndex+19]
            //Remove out of bounds
            possibleMoves = possibleMoves.map(int => {if(!isOffBoard(int)) return convertBoard(int)}).filter(int => int !== undefined)
            //Check for teamate/enemy
            possibleMoves = possibleMoves.map(int => {
                if(!board[int].piece) return int
                else if(!this.isSameTeam(board[int].piece.team)) return int
            }).filter(int => int !== undefined)

            return possibleMoves
        }
    }
}
```

Chess Engine
---
The engine uses two arrays to position the pieces on the board and to detect moves considered out of bounds.
