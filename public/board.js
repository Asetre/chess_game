//The chess board
export default class Board {
    //methods: convertBounds, convertBoard, isOffBoard, placePiece, isTileEmpty
    //Initialize methods: createArrays, findOutOfBounds

    //Initialize the default board
    constructor() {
        //The actual playing board conatining tiles and pieces
        this.board = []
        //The board containing the boundaries
        this.boundsBoard = []
        //values considered out of bounds
        this.outOfBounds = []

        //Start of methods
        this.createArrays()
        this.findOutOfBounds()
    }
    //Create 2 arrays to represent the board
    //1 arrays length of 64, 1 array length of 120
    //Array 1 index based ex: 0..63, Array 2 index based [0..119]
    createArrays() {
        //push 64 empty the tiles into the board
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                let tile = {
                    rankFile: `${i},${j}`,
                    piece: null
                }
                this.board.push(tile)
            }
        }
        for(let i = 0; i < 120; i++) {
            this.boundsBoard.push(i)
        }
    }

    findOutOfBounds() {
        this.boundsBoard.forEach(index => {
            //Top
            if(index <= 19) this.outOfBounds.push(index)
            //left side
            else if(index % 10 === 0) this.outOfBounds.push(index)
            //right side
            else if(index % 10 === 9) this.outOfBounds.push(index)
            //bottom
            else if(index > 100) this.outOfBounds.push(index)
        })
    }

    //converts 64 index based array to 120 index based array
    convertBounds(rankFile) {
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
    convertBoard(index){
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
        if(!this.isOffBoard(index)) return val
        //return null if out of bounds
        else return null
    }

    //returns boolean if index is considered offboard
    isOffBoard(index) {
        //index === boundsBoard[index]
        return this.outOfBounds.indexOf(index) !== -1 ? true : false
    }

    //place a piece on a tile
    placePiece(piece, index) {
        piece.position = index
        this.board[index].piece = piece
    }

}
