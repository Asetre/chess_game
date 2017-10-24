const shortid = require('shortid')

let findQue = []
module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('find game', socketId => {
            console.log('added to que')
            findQue.push(socketId)
            matchPlayers(io)
        })

        socket.on('move piece', data => {
            let turn
            if(data.turn === 1) turn = 0
            else if(data.turn === 0) turn = 1
            let info = {
                turn: turn,
                board: data.board,
                newLocation: data.newLocation,
                piece: data.piece
            }
            io.to(data.opponent).emit('update', info)
        })

    })
}

function matchPlayers(io) {
    if(findQue.length % 2 === 0)  {
        console.log('game found')
        //let roomId = shortid.generate()
        //Save players
        let playerOne = findQue[0]
        let playerTwo = findQue[1]

        io.to(playerOne).emit('game found', {
            team: 1,
            opponent: playerTwo
        })
        io.to(playerTwo).emit('game found', {
            team: 0,
            opponent: playerOne
        })
        //Update the room que
        findQue.splice(0, 2)
    }
}
