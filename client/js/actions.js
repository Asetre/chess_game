export const init_board = 'initialize board'
export const find_moves = 'find validMoves'
export const invalid_move = 'invalid move'
export const move_piece = 'move piece'
export const change_turn = 'change player turn'
export const user_login = 'login user'
export const find_game = 'finding game'
export const start_game = 'starting game'
export const update_board = 'update board'

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

export function loginUser(user) {
    return {
        type: user_login,
        payload: user
    }
}

export function findingGame() {
    return {
        type: find_game
    }
}

export function startGame(team, opponent) {
    return {
        type: start_game,
        payload: {team: team, opponent: opponent}
    }
}

export function updateBoard(data) {
    return {
        type: update_board,
        payload: data
    }
}
