import * as actions from './actions.js'

export let initialBoardState = {
    board: [],
    validMoves: [],
    playerTurn: 1,
    selectedPiece: null,
    status: null,
    loggedIn: false,
    playerTeam: null,
    playerOneClass: 'no class',
    playerTwoClass: 'no class',
    user: null,
    opponent: null,
    redirect: false,
    inCheck: false,
    inCheckTiles: null,
    winner: null,
    loser: null,
    gameOver: false,
    opponentInfo: null,
    errors: null
}

export default function reducer(state=initialBoardState, action) {
    let payload = action.payload
    switch (action.type) {
        case actions.init_board:
        return Object.assign({}, state, {board: payload.board, status: 'idle'})

        case actions.find_moves:
        return Object.assign({}, state, {validMoves: payload.validMoves, selectedPiece: payload.piece, status: 'waiting for valid move'})

        case actions.invalid_move:
        return Object.assign({}, state, {validMoves: [], selectedPiece: null, status: 'idle'})

        case actions.move_piece:
        return Object.assign({}, state, {board: payload, selectedPiece: null, validMoves: [], status: 'idle', inCheck: false, inCheckKingPos: null})

        case actions.change_turn:
        return Object.assign({}, state, {playerTurn: payload})

        case actions.user_login:
        return Object.assign({}, state, {user: payload, status: 'dashboard', loggedIn: true})

        case actions.find_game:
        return Object.assign({}, state, {status: 'looking for game'})

        case actions.start_game:
        return Object.assign({}, state, {playerTeam: payload.team, opponent: payload.opponent, status: 'idle', playerOneClass: payload.playerOneClass, playerTwoClass: payload.playerTwoClass, opponentInfo: payload.opponentInfo})

        case actions.update_board:
        return Object.assign({}, state, {playerTurn: payload.turn, board: payload.board})

        case actions.in_check:
        return Object.assign({}, state, {inCheck: true, inCheckTiles: payload})

        case actions.game_over:
        return Object.assign({}, state, {board: [], validMoves: [], playerTurn: 1, selectedPiece: null, status: 'game over', playerTeam: null, opponent: null, redirect: false, inCheck: false, inCheckKingPos: null, winner: payload.winner, loser: payload.loser})

        case actions.cancel_search:
        return Object.assign({}, state, {status: 'dashboard'})

        case actions.redirect_dashboard:
        return Object.assign({}, state, {status: 'dashboard', redirect: false, winner: null, loser: null})

        case actions.add_err:
        return Object.assign({}, state, {errors: payload})

        case actions.update_user:
        return Object.assign({}, state, {user: payload})

        default:
        return state
    }
}
