import * as actions from './actions.js'

export let initialBoardState = {
    board: [],
    validMoves: [],
    playerTurn: 1,
    selectedPiece: null,
    status: null,
    playerTeam: null,
    playerPieces: null,
    user: null,
    opponent: null,
    redirect: false,
    inCheck: false,
    inCheckKingPos: null
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
        return Object.assign({}, state, {user: payload})

        case actions.find_game:
        return Object.assign({}, state, {status: 'looking for game'})

        case actions.start_game:
        return Object.assign({}, state, {playerTeam: payload.team, opponent: payload.opponent, status: 'idle', redirect: true})

        case actions.update_board:
        return Object.assign({}, state, {playerTurn: payload.turn, board: payload.board})

        case actions.in_check:
        return Object.assign({}, state, {inCheck: true, inCheckKingPos: payload.position})

        default:
        return state
    }
}