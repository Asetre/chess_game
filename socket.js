const shortid = require('shortid')
const User = require('./models/users.js')

let findQue = []
let users = {}
module.exports = function(io) {
    io.on('connection', socket => {
        socket.on('login', data => {
            users[data.username] = data.socketId
        })

        socket.on('find game', data => {
            let player = {
                id: data.id,
                selectedClass: data.selectedClass
            }
            findQue.push(player)
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
                oldLocation: data.oldLocation
            }
            io.to(data.opponent).emit('update board', info)
        })

        socket.on('cancel search', socketId => {
            let i = findQue.findIndex(player => player.id == socket.id)
            findQue.splice(i, 1)
            io.to(socketId).emit('search cancelled')
        })

        socket.on('game over', data => {
            let opponent
            //find the opponent
            let key
            for(key in users) {
                if(users[key] == data.opponent) {
                    opponent = key
                    break
                }
            }
            //check to see if the emitter is the winner
            let winner
            data.winner === data.userTeam ? winner = data.user.local.username : opponent

            let info = {
                winner: winner,
                loser: opponent
            }

            let findWinner = User.findOne({"local.username": winner})
            let findLoser = User.findOne({"local.username": opponent})

            Promise.all([findWinner, findLoser])
            .then(users => {
                let winUser = users[0]
                let loseUser = users[1]
                winUser.wins++
                loseUser.losses++
                winUser.save()
                return loseUser.save()
            })
            .then(() => {
                io.to(data.userSocketId).emit('game over', info)
                io.to(users[opponent]).emit('game over', info)
            })
            .catch(err => {
                console.log(err)
            })
        })

    })
}

function matchPlayers(io) {
    if(findQue.length % 2 === 0)  {
        //let roomId = shortid.generate()
        //Save players
        let playerOne = findQue[0]
        let playerTwo = findQue[1]

        io.to(playerOne.id).emit('game found', {
            team: 1,
            opponent: playerTwo.id,
            playerOneSelectedClass: playerOne.selectedClass,
            playerTwoSelectedClass: playerTwo.selectedClass
        })
        io.to(playerTwo.id).emit('game found', {
            team: 0,
            opponent: playerOne.id,
            playerOneSelectedClass: playerOne.selectedClass,
            playerTwoSelectedClass: playerTwo.selectedClass
        })
        //Update the room que
        findQue.splice(0, 2)
    }
}
