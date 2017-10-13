const mocha = require('mocha')
const chai = require('chai')
const assert = chai.assert

import Board from '../public/board.js'

describe('Board functionality', function() {
    it('should Initialize an empty board', function() {
        let board = new Board
        console.log(board)
    })
})

describe('Chess Pieces functionality', function() {
})
