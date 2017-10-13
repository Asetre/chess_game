//The chess board
export default Class Board {
    //Initialize the default board
    init() {
        createArrays()
    }()

    //Create 2 arrays to represent the board
    //2 arrays length of 64, 1 array length of 120
    //Array 1 index based ex: 0..63, Array 2 index based [0..120]
    createArrays() {
        //The actual playing board conatining pieces
        this.board = []
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
        //The board containing the boundaries
        this.boundsBoard = []
        for(let i = 0; i < 120; i++) {
            this.boundsBoard.push(i)
        }
    }
}
