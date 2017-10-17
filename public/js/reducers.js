let initialBoardState = {
    board: [],
    validMoves: []
}

export default function reducer(state=initialBoardState, action) {
    let payload = action.payload
    switch (action.type) {

        case 'initialize_board':
        return Object.assign({}, state, {board: payload.board})

        case 'find_validMoves':
        return Object.assign({}, state, {validMoves: payload.validMoves})

        case 'move_piece':
        //Do stuff
        break;

        default:
        return state
    }
}



/* later use for web sockets
export default combineReducers({

})
*/
