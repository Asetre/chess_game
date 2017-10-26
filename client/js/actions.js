export const init_board = 'initialize board'
export const find_moves = 'find validMoves'
export const invalid_move = 'invalid move'
export const move_piece = 'move piece'
export const change_turn = 'change player turn'
export const user_login = 'login user'
export const find_game = 'finding game'
export const start_game = 'starting game'
export const update_board = 'update board'
export const in_check = 'player in check'
export const game_over = 'game over'
export const cancel_search = 'cancel search'
export const redirect_dashboard = 'redirect to dashboard'
export const add_err = 'add error'

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

export function startGame(team, opponent, pOneClass, pTwoClass, opponentInfo) {
    return {
        type: start_game,
        payload: {team: team, opponent: opponent, playerOneClass: pOneClass, playerTwoClass: pTwoClass, opponentInfo: opponentInfo}
    }
}

export function updateBoard(data) {
    return {
        type: update_board,
        payload: data
    }
}

export function playerInCheck(data) {
    return {
        type: in_check,
        payload: data
    }
}

export function gameOver(winner, loser) {
    return {
        type: game_over,
        payload: {winner: winner, loser: loser}
    }
}

export function cancelSearch() {
    return {
        type: cancel_search
    }
}

export function redirectDashboard() {
    return {
        type: redirect_dashboard
    }
}

export function addError(err) {
    return {
        type: add_err,
        payload: err
    }
}
