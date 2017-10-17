//The actual board
export var board = []
//The board containing the boundaries
export var boundsBoard = []
//An array of boundsBoard indexes that are considered outOfBounds
export var outOfBounds = []
/* ---------------------------------------------------------------------- */
//Initializers / Setup
/* ---------------------------------------------------------------------- */
export function InitializeBoard() {
    createArrays()
    findOutOfBounds()
}
function createArrays() {
    //push 64 empty the tiles into the board
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            let tile = {
                rankFile: `${i},${j}`,
                piece: null
            }
            board.push(tile)
        }
    }
    //push 120 integers representing its index into boundsBoard
    for(let i = 0; i < 120; i++) {
        boundsBoard.push(i)
    }
}

//check to see if index value is considered out of bounds
function findOutOfBounds() {
    boundsBoard.forEach(index => {
        //Top
        if(index <= 19) outOfBounds.push(index)
        //left side
        else if(index % 10 === 0) outOfBounds.push(index)
        //right side
        else if(index % 10 === 9) outOfBounds.push(index)
        //bottom
        else if(index > 100) outOfBounds.push(index)
    })
}

//empy all arrays
export function resetBoard() {
    board = []
    boundsBoard = []
    outOfBounds = []
}
/* ---------------------------------------------------------------------- */
//Local Methods
/* ---------------------------------------------------------------------- */

//converts 64 index based array to 120 index based array
export function convertBounds(rankFile) {
    //rankFile is a string ex: '0,6' => board[6]
    //convert rankFile to an array of inegers ex: '1,8' => [1,8]
    let parsed = rankFile.split(',').map(num => parseInt(num))
    let rank = parsed[0]
    let file = parsed[1]
    let boundsIndex = (21 + file) + (rank * 10)
    //return the index of 120 array
    return boundsIndex
}
//converts index from 120 array to 64 array
export function convertBoard(index){
    //index === boundsBoard[index]
    let val
    //convert depending on index inside boundsBoard
    if(index<31) {
        val = index-21
    }else if(index<41) {
        val = index-21-2
    }else if(index<51) {
        val = index-21-4
    }else if(index<61) {
        val = index-21-6
    }else if(index<71) {
        val = index-21-8
    }else if(index<81) {
        val = index-21-10
    }else if(index<91) {
        val = index-21-12
    }else if(index<101) {
        val  = index-21-14
    }
    //return the board index if not out of bounds
    if(!isOffBoard(index)) return val
    //return null if out of bounds
    else return null
}
//returns boolean if index is considered offboard
export function isOffBoard(index) {
    //index === boundsBoard[index]
    //console.log(this.outOfBounds.indexOf(index))
    return outOfBounds.indexOf(index) !== -1 ? true : false
}
//place a piece on a tile
export function placePiece(piece, index) {
    piece.position = index
    board[index].piece = piece
}

//check if tile has a piece
export function isTileEmpty(index) {
    return board[index].piece ? false : true
}

//moves a piece from an index to a new index
export function movePiece(piece, newPosition) {
    //remove the piece from old location
    board[piece.position].piece = null
    //place the piece into the new position
    board[newPosition].piece = piece
}

/* ---------------------------------------------------------------------- */
//Chess Pieces
/* ---------------------------------------------------------------------- */

class Piece {
    constructor(team) {
        //Array of valid moves
        this.validMoves = []
        //1 == white, 0 == black
        this.team = team
        //if type is declared create special moves
        this.type = arguments[1]
        //board index
        this.position = null
    }
    //check if the same team
    isSameTeam(pieceTeam) {
        //pieceTeam == 1 or 0
        return this.team === pieceTeam ? true : false
    }
    //check if tile has a piece
    isTileEmpty(index) {
        return this.board[index].piece ? false : true
    }
}

export class King extends Piece {
    constructor(team, type) {
        super(team, type)
        this.king = true
        this.team === 1 ? this.name = 'whiteKing' : 'blackKing'
    }

    findValidMoves() {
        //Convert the board position to bound position
        let posBounds = convertBounds(board[this.position].rankFile)
        let possibleMoves = [posBounds+1, posBounds-1, posBounds+10, posBounds-10, posBounds+11, posBounds+9, posBounds-11, posBounds-9]
        this.validMoves = possibleMoves.map(int => {
            if(!isOffBoard(int)) {
                let posBoard = convertBoard(int)
                if(isTileEmpty(posBoard)) return posBoard
                else if(!isTileEmpty(posBoard) && !this.isSameTeam(board[posBoard].piece.team)) return posBoard
            }
        }).filter(int => int !== undefined)
        return this.validMoves
    }
}

export class Queen extends Piece {
    constructor(team) {
        super(team)
    }

    findValidMoves() {
        let posBounds = convertBounds(board[this.position].rankFile)
        let possibleMoves = []
        //Check North
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+10; !isOffBoard(boundsIndex); boundsIndex+= 10) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check North East
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+11; !isOffBoard(boundsIndex); boundsIndex+=11) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check East
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+1; !isOffBoard(boundsIndex); boundsIndex++) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check South East
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-9; !isOffBoard(boundsIndex); boundsIndex-=9) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check South
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-10; !isOffBoard(boundsIndex); boundsIndex-= 10) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check South West
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-11; !isOffBoard(boundsIndex); boundsIndex-=11) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check West
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-1; !isOffBoard(boundsIndex); boundsIndex--) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        this.validMoves = possibleMoves
        return this.validMoves
    }
}

export class Rook extends Piece {
    constructor(team) {
        super(team)
    }
    findValidMoves() {
        let posBounds = convertBounds(board[this.position].rankFile)
        let possibleMoves = []
        //Check North
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+10; !isOffBoard(boundsIndex); boundsIndex+= 10) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check East
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+1; !isOffBoard(boundsIndex); boundsIndex++) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check South
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-10; !isOffBoard(boundsIndex); boundsIndex-= 10) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check West
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-1; !isOffBoard(boundsIndex); boundsIndex--) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        this.validMoves = possibleMoves
        return this.validMoves
    }
}

export class Bishop extends Piece{
    constructor(team, type) {
        super(team, type)
    }

    findValidMoves() {
        let posBounds = convertBounds(board[this.position].rankFile)
        let possibleMoves = []

        //Check North East
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+11; !isOffBoard(boundsIndex); boundsIndex+=11) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check South East
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-9; !isOffBoard(boundsIndex); boundsIndex-=9) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }

        //Check South West
        for(let boundsIndex = convertBounds(board[this.position].rankFile)-11; !isOffBoard(boundsIndex); boundsIndex-=11) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        //Check North West
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+9; !isOffBoard(boundsIndex); boundsIndex+=9) {
            let posBoard = convertBoard(boundsIndex)
            if(!board[posBoard].piece) possibleMoves.push(posBoard)
            else if(!this.isSameTeam(board[posBoard].piece.team)) {
                possibleMoves.push(posBoard)
                break
            }else break
        }
        return possibleMoves
    }
}

export class Knight extends Piece {
    constructor(team, type) {
        super(team, type)
    }
    findValidMoves() {
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
//Note pawns cannot en passant, or double move on first move
export class Pawn extends Piece {
    constructor(team) {
        super(team)
        this.firstMove = true
    }
    findValidMoves() {
        let boundsIndex = convertBounds(board[this.position].rankFile)
        //order of moves, north, north east, north west
        let possibleMoves
        //Check which direction the pawn should be able to move
        if(this.team === 0) possibleMoves = [boundsIndex-10, boundsIndex-11, boundsIndex-9]
        else possibleMoves = [boundsIndex+10, boundsIndex+11, boundsIndex+9]
        let actualMoves = []
        //check to see if it can move forward
        if(!isOffBoard(possibleMoves[0]) && !board[convertBoard(possibleMoves[0])].piece) actualMoves.push(convertBoard(possibleMoves[0]))
        //check to see if it can attack diagonally
        let possibleAttacks = possibleMoves.splice(1)
        possibleAttacks.forEach(int => {
            let posBoard = convertBoard(int)
            if(!isOffBoard(int)) {
                if(board[posBoard].piece) {
                    if(!this.isSameTeam(board[posBoard].piece.team)) actualMoves.push(posBoard)
                }
            }
        })
        return actualMoves
    }
}
