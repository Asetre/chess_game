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
    //update the position
    piece.position = newPosition
}

export function setupPieces() {
    //accepts second argument as type(class)
    //todo: add types
    //currently only default setup
    //white pieces
    let whiteKing = new King(1)
    let whiteQueen = new Queen(1)
    let whiteRook1 = new Rook(1)
    let whiteRook2 = new Rook(1)
    let whiteKnight1 = new Knight(1)
    let whiteKnight2 = new Knight(1)
    let whiteBishop1 = new Bishop(1)
    let whiteBishop2 = new Bishop(1)

    let whitePawn1 = new Pawn(1)
    let whitePawn2 = new Pawn(1)
    let whitePawn3 = new Pawn(1)
    let whitePawn4 = new Pawn(1)
    let whitePawn5 = new Pawn(1)
    let whitePawn6 = new Pawn(1)
    let whitePawn7 = new Pawn(1)
    let whitePawn8 = new Pawn(1)

    //black pieces
    let blackKing = new King(0)
    let blackQueen = new Queen(0)
    let blackRook1 = new Rook(0)
    let blackRook2 = new Rook(0)
    let blackKnight1 = new Knight(0)
    let blackKnight2 = new Knight(0)
    let blackBishop1 = new Bishop(0)
    let blackBishop2 = new Bishop(0)

    let blackPawn1 = new Pawn(0)
    let blackPawn2 = new Pawn(0)
    let blackPawn3 = new Pawn(0)
    let blackPawn4 = new Pawn(0)
    let blackPawn5 = new Pawn(0)
    let blackPawn6 = new Pawn(0)
    let blackPawn7 = new Pawn(0)
    let blackPawn8 = new Pawn(0)

    //place onto board
    placePiece(whiteKing, 60)
    placePiece(whiteQueen, 59)
    placePiece(whiteRook1, 56)
    placePiece(whiteRook2, 63)
    placePiece(whiteBishop1, 58)
    placePiece(whiteBishop2, 61)
    placePiece(whiteKnight1, 57)
    placePiece(whiteKnight2, 62)

    placePiece(whitePawn1, 48)
    placePiece(whitePawn2, 49)
    placePiece(whitePawn3, 50)
    placePiece(whitePawn4, 51)
    placePiece(whitePawn5, 52)
    placePiece(whitePawn6, 53)
    placePiece(whitePawn7, 54)
    placePiece(whitePawn8, 55)

    placePiece(blackKing, 4)
    placePiece(blackQueen, 3)
    placePiece(blackRook1, 0)
    placePiece(blackRook2, 7)
    placePiece(blackKnight1, 1)
    placePiece(blackKnight2, 6)
    placePiece(blackBishop1, 2)
    placePiece(blackBishop2, 5)

    placePiece(blackPawn1, 8)
    placePiece(blackPawn2, 9)
    placePiece(blackPawn3, 10)
    placePiece(blackPawn4, 11)
    placePiece(blackPawn5, 12)
    placePiece(blackPawn6, 13)
    placePiece(blackPawn7, 14)
    placePiece(blackPawn8, 15)
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
        this.team === 1 ? this.name = 'whiteKing' : this.name = 'blackKing'
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
        this.team === 1 ? this.name = 'whiteQueen' : this.name = 'blackQueen'
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
        //Check North West
        for(let boundsIndex = convertBounds(board[this.position].rankFile)+9; !isOffBoard(boundsIndex); boundsIndex+=9) {
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
        this.team === 1 ? this.name = 'whiteRook' : this.name = 'blackRook'
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
        this.team === 1 ? this.name = 'whiteBishop' : this.name = 'blackBishop'
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
        this.team === 1 ? this.name = 'whiteKnight' : this.name = 'blackKnight'
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
        this.team === 1 ? this.name = 'whitePawn' : this.name = 'blackPawn'
    }
    findValidMoves() {
        let boundsIndex = convertBounds(board[this.position].rankFile)
        //order of moves, north, north east, north west
        let possibleMoves
        //Check which direction the pawn should be able to move
        if(this.team === 1) possibleMoves = [boundsIndex-10, boundsIndex-11, boundsIndex-9]
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
