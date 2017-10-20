export const init_board = 'initialize board'
export const find_moves = 'find validMoves'
export const invalid_move = 'invalid move'
export const move_piece = 'move piece'
export const change_turn = 'change player turn'

export function initializeBoard(board) {
    return {
        type: init_board,
        payload: {
            board: board
        }
    }
}

export function addMoves(movesArr, piece) {
    return {
        type: find_moves,
        payload: {
            validMoves: movesArr,
            piece: piece
        }
    }
}

export function invalidMove() {
    return {
        type: invalid_move
    }
}

export function movePiece(board) {
    return {
        type: move_piece,
        payload: board
    }
}

export function changePlayerTurn(newTurn) {
    return {
        type: change_turn,
        payload: newTurn
    }
}
