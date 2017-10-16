const mocha = require('mocha')
const chai = require('chai')
const assert = chai.assert

import * as Engine from '../public/chess_engine.js'
//useful functions
var placePiece = Engine.placePiece

function matchArray(arr1, arr2) {
    for(let i = 0; i < arr1.length; i++) {
        if(arr1.length !== arr2.length) return false
        if(arr1[i] !== arr2[i]) {
            console.log(`${arr1[i]} === ${arr2[i]}`)
            return false
        }
    }
    return true
}

describe('Board functionality', function() {
    var board
    before(function() {
        Engine.InitializeBoard()
        board = Engine.board
    })

    it('should InitializeBoard', function() {
        assert.equal(board.length, 64, 'board should contain 64 tiles')
        assert.include(board[0], {rankFile: '0,0', piece: null}, 'array should contain tiles')
        assert.equal(Engine.boundsBoard.length, 120, 'should Initialize boundsBoard')
    })

    it('should be able to place a piece on a tile', function() {
        let whiteKing = new Engine.King(1)
        Engine.placePiece(whiteKing, 0)
        assert.strictEqual(board[0].piece, whiteKing, 'the piece should be the same')
    })
})

describe('Piece functionality', function() {
    describe('King', function() {
        var board
        beforeEach(function() {
            Engine.resetBoard()
            Engine.InitializeBoard()
            board = Engine.board
        })

        it('should detect borders', function() {
            let whiteKing = new Engine.King(1)
            placePiece(whiteKing, 0)
            let moves = whiteKing.findValidMoves()
            let correctMoves = [1,8,9]
            assert.equal(matchArray(moves, correctMoves), true, 'correct moves should equal moves')
        })

        it('should detect teamates', function() {
            let whiteKing = new Engine.King(1)
            let anotherKing = new Engine.King(1)
            placePiece(whiteKing, 0)
            placePiece(anotherKing, 1)
            let moves = whiteKing.findValidMoves()
            let correctMoves = [8,9]
            assert.equal(matchArray(moves, correctMoves), true, 'should match moves')
        })

        it('should detect enemies', function() {
            let whiteKing = new Engine.King(1)
            let blackKing = new Engine.King(0)
            placePiece(whiteKing, 0)
            placePiece(blackKing, 1)
            let moves = whiteKing.findValidMoves()
            let correctMoves = [1, 8, 9]
            assert.equal(matchArray(moves, correctMoves), true, 'should be able to detect enemies')
        })
    })

    describe('Rook', function() {
        var board
        beforeEach(function() {
            Engine.resetBoard()
            Engine.InitializeBoard()
            board = Engine.board
        })

        it('should detect borders', function() {
            let whiteRook = new Engine.Rook(1)
            let secondRook = new Engine.Rook(1)
            placePiece(whiteRook, 0)
            placePiece(secondRook, 9)
            let moves = whiteRook.findValidMoves()
            let correctMoves = [8,16,24,32,40,48,56,1,2,3,4,5,6,7]
            assert.equal(matchArray(moves, correctMoves), true, 'should see the borders')

            let secondMoves = secondRook.findValidMoves()
            let secondCorrectMoves = [17,25,33,41,49,57,10,11,12,13,14,15,1,8]
            assert.equal(matchArray(secondMoves, secondCorrectMoves), true, 'should check all sides')
        })

        it('should detect teamates', function() {
            let whiteRook = new Engine.Rook(1)
            let secondRook = new Engine.Rook(1)
            let thirdRook = new Engine.Rook(1)
            placePiece(whiteRook, 0)
            placePiece(secondRook, 1)
            placePiece(thirdRook, 8)
            let moves = whiteRook.findValidMoves()
            let correctMoves = []
            assert(matchArray(moves, correctMoves), true, 'should have no valid moves')
        })

        it('should detect enemies', function() {
            let whiteRook = new Engine.Rook(1)
            let blackRook = new Engine.Rook(0)
            let secondRook = new Engine.Rook(0)
            placePiece(whiteRook, 0)
            placePiece(blackRook, 4)
            placePiece(secondRook, 16)
            let moves = whiteRook.findValidMoves()
            let correctMoves = [8,16,1,2,3,4]
            assert.equal(matchArray(moves, correctMoves), true, 'should see enemies')
        })
    })

    describe('Bishop', function() {
        var board
        beforeEach(function() {
            Engine.resetBoard()
            Engine.InitializeBoard()
            board = Engine.board
        })

        it('should detect borders', function() {
            let whiteBishop = new Engine.Bishop(1)
            let secondBishop = new Engine.Bishop(1)
            placePiece(whiteBishop, 0)
            placePiece(secondBishop, 10)
            let moves = whiteBishop.findValidMoves()
            let correctMoves = [9,18,27,36,45,54,63]
            let secondMoves = secondBishop.findValidMoves()
            let secondCorrectMoves = [19,28,37,46,55,3,1,17,24]
            assert.equal(matchArray(moves, correctMoves), true, 'bishop in corner')
            assert.equal(matchArray(secondMoves, secondCorrectMoves), true, 'biship position 10')
        })

        it('should detect teamates', function() {
            let whiteBishop = new Engine.Bishop(1)
            let secondBishop = new Engine.Bishop(1)
            placePiece(whiteBishop, 0)
            placePiece(secondBishop, 18)
            let moves = whiteBishop.findValidMoves()
            let correctMoves = [9]
            assert.equal(matchArray(moves, correctMoves), true, 'should see teamates')
        })

        it('should detect enemies', function() {
            let whiteBishop = new Engine.Bishop(1)
            let blackBishop = new Engine.Bishop(0)
            placePiece(whiteBishop, 0)
            placePiece(blackBishop, 27)
            let moves = whiteBishop.findValidMoves()
            let correctMoves = [9,18,27]
            assert.equal(matchArray(moves, correctMoves), true, 'should see enemies')
        })
    })

    describe('Knight', function() {
        var board
        beforeEach(function() {
            Engine.resetBoard()
            Engine.InitializeBoard()
            board = Engine.board
        })

        it('should detect borders', function() {
            let whiteKnight = new Engine.Knight(1)
            placePiece(whiteKnight, 0)
            let moves = whiteKnight.findValidMoves()
        })

        it('should detect teamates', function() {
            let whiteKnight = new Engine.Knight(1)
            let secondKnight = new Engine.Knight(1)
            placePiece(whiteKnight, 0)
            placePiece(secondKnight, 10)
            let moves = whiteKnight.findValidMoves()
            let correctMoves = [17]
            let secondMoves = secondKnight.findValidMoves()
            let secondCorrectMoves = [27,20,4,16,25]
            assert.equal(matchArray(moves, correctMoves), true, 'should see teamates')
            assert.equal(matchArray(secondMoves, secondCorrectMoves), true, 'should see teamates')

        })

        it('should detect enemies', function() {
            let whiteKnight = new Engine.Knight(1)
            let blackKnight = new Engine.Knight(0)
            let secondKnight = new Engine.Knight(1)
            placePiece(whiteKnight, 0)
            placePiece(blackKnight, 10)
            placePiece(secondKnight, 17)
            let moves = whiteKnight.findValidMoves()
            let correctMoves = [10]
            assert.equal(matchArray(moves, correctMoves), true, 'should see enemies')
        })
    })

    describe('Queen', function() {
        var board
        beforeEach(function() {
            Engine.resetBoard()
            Engine.InitializeBoard()
            board = Engine.board
        })

        it('should detect borders', function() {
            let whiteQueen = new Engine.Queen(1)
            placePiece(whiteQueen, 0)
            let moves = whiteQueen.findValidMoves()
            let correctMoves = [ 8, 16, 24, 32, 40, 48, 56, 9, 18, 27, 36, 45, 54, 63, 1, 2, 3, 4, 5, 6, 7 ]
            assert.equal(matchArray(moves, correctMoves),true, 'should not allow piece to go off board')
        })

        it('should detect teamates', function() {
            let whiteQueen = new Engine.Queen(1)
            let whiteKnight = new Engine.Knight(1)
            let whiteBishop = new Engine.Bishop(1)
            let whiteKing = new Engine.King(1)
            placePiece(whiteQueen, 0)
            placePiece(whiteKnight, 16)
            placePiece(whiteBishop, 4)
            placePiece(whiteKing, 27)
            let moves = whiteQueen.findValidMoves()
            let correctMoves = [ 8, 9, 18, 1, 2, 3 ]
            assert.equal(matchArray(moves, correctMoves), true, 'should see teamates')
        })

        it('should detect enemies', function() {
            let whiteQueen = new Engine.Queen(1)
            let blackKnight = new Engine.Knight(0)
            let whiteBishop = new Engine.Bishop(1)
            let blackKing = new Engine.King(0)
            placePiece(whiteQueen, 0)
            placePiece(blackKnight, 16)
            placePiece(whiteBishop, 4)
            placePiece(blackKing, 27)
            let moves = whiteQueen.findValidMoves()
            let correctMoves = [ 8, 16, 9, 18, 27, 1, 2, 3 ]
            assert.equal(matchArray(moves, correctMoves), true, 'should detect enemies')
        })
    })

})
