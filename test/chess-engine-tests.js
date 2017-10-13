const mocha = require('mocha')
const chai = require('chai')
const assert = chai.assert

import Board from '../public/board.js'

describe('Board functionality', function() {
    var testBoard
    var board
    var boundsBoard

    beforeEach(function() {
        testBoard = new Board
        board = testBoard.board
        boundsBoard = testBoard.boundsBoard
    })

    it('should Initialize an empty board', function() {
        assert(board.length === 64, 'Board array should have 64 tiles')
        assert(boundsBoard.length === 120, 'boundsBoard should have 120 tiles')
        assert(board[0].rankFile === '0,0' && board[0].piece === null, 'tile should have correct keys')
        assert(board[63].rankFile === '7,7' && board[63].piece === null, 'tile should have correct keys')
    })

    it('should convert to bounds', function() {
        assert(testBoard.convertBounds('0,0') === 21, 'convert rankFile to bounds board')
        assert(testBoard.convertBounds('1,3') === 34, 'convert rankFile to bounds board')
        assert(testBoard.convertBounds('2,0') === 41, 'convert rankFile to bounds board')
    })

    it('should convert to board', function() {
        assert(testBoard.convertBoard(21) === 0, 'boundsBoard[21] === board[0]')
        assert(testBoard.convertBoard(33) === 10, 'boundsBoard[33] === board[10]')
        assert(testBoard.convertBoard(40) === null, 'boundsBoard[40] === null')
        assert(testBoard.convertBoard(49) === null, 'boundsBoard[49] === null')
    })
})

describe('Chess Pieces functionality', function() {
})
