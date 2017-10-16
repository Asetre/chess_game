import Board from './board.js'

export default class Piece extends Board {
    //Initialize default pieace methods
    constructor(board) {
        super()
        this.board = board
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

////////////////////////////////////////////////////////////////////////
//Note: the only pieces with a type are currently (knight, king, bishop)
////////////////////////////////////////////////////////////////////////

export class King extends Piece {
    constructor(team, board) {
        super(board)
        //array of valid moves from board array
        this.validMoves = []
        //Set the king to be true
        this.isKing = true
        //set which team the king belongs to
        this.team = team
        //if type is passed as an argument set type
        this.type = arguments[1]
        //position represented as an index for the board array
        this.position = null
    }

    findValidMoves() {
        //Convert the board position to bound position
        let posBounds = this.convertBounds(this.board[this.position].rankFile)
        let possibleMoves = [posBounds+1, posBounds-1, posBounds+10, posBounds-10, posBounds+11, posBounds+9, posBounds-11, posBounds-9]
        let actualMoves = possibleMoves.filter(int => {
            if(!this.isOffBoard(int)) {
                let posBoard = this.convertBoard(int)
                if(this.isTileEmpty) return int
                else if(this.TileEmpty && !this.isSameTeam(board[posBoard].team)) return int
            }
        })
        return actualMoves
    }
}
