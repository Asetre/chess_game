const init_board = 'initialize_board'
const find_moves = 'find_validMoves'

export const initializeBoard = board => {
    return {
        type: init_board,
        payload: {
            board: board
        }
    }
}

export const findMoves = movesArr => {
    return {
        type: find_moves,
        payload: {
            validMoves: movesArr
        }
    }
}
