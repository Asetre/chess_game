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
            let opponentTeam = data.userTeam === 1 ? 0 : 1
            //check to see if the emitter is the winner
            let winner = data.winner === data.userTeam ? data.user.local.username : data.opponent.username
            let loser = data.winner === opponentTeam ? data.user.local.username : data.opponent.username

            let info = {
                winner: winner,
                loser: loser
            }

            io.to(data.userSocketId).emit('game over', info)
            io.to(data.opponentSocketId).emit('game over', info)

            let findWinner = User.findOne({"local.username": winner})
            let findLoser = User.findOne({"local.username": loser})

            Promise.all([findWinner, findLoser])
            .then(users => {
                let winUser = users[0]
                let loseUser = users[1]
                winUser.wins++
                loseUser.losses++
                winUser.save()
                return loseUser.save()
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
        let playerOneUsername
        let playerTwoUsername
        //find player one username
        let key
        for(key in users) {
            if(users[key] === playerOne.id) playerOneUsername = key
            if(users[key] === playerTwo.id) playerTwoUsername = key
        }
        console.log(users)
        //Get the user info
        let findOne = User.findOne({"local.username": playerOneUsername})
        let findTwo = User.findOne({"local.username": playerTwoUsername})

        Promise.all([findOne, findTwo])
        .then( data => {
            let userOne = data[0]
            let userTwo = data[1]
            let userInfoOne = {
                username: userOne.local.username,
                wins: userOne.wins,
                losses: userOne.losses
            }
            let userInfoTwo = {
                username: userTwo.local.username,
                wins: userTwo.wins,
                losses: userTwo.losses
            }

            io.to(playerOne.id).emit('game found', {
                team: 1,
                opponent: playerTwo.id,
                playerOneSelectedClass: playerOne.selectedClass,
                playerTwoSelectedClass: playerTwo.selectedClass,
                opponentInfo: userInfoTwo
            })
            io.to(playerTwo.id).emit('game found', {
                team: 0,
                opponent: playerOne.id,
                playerOneSelectedClass: playerOne.selectedClass,
                playerTwoSelectedClass: playerTwo.selectedClass,
                opponentInfo: userInfoOne
            })
            //Update the room que
            findQue.splice(0, 2)
        })

    }
}
