import React from 'react'

import whiteKing from '../../images/wK.png'
import whiteQueen from '../../images/wQ.png'
import whiteRook from '../../images/wR.png'
import whiteKnight from '../../images/wKn.png'
import whiteBishop from '../../images/wB.png'
import whitePawn from '../../images/wP.png'
import blackKing from '../../images/bK.png'
import blackQueen from '../../images/bQ.png'
import blackRook from '../../images/bR.png'
import blackKnight from '../../images/bKn.png'
import blackBishop from '../../images/bB.png'
import blackPawn from '../../images/bP.png'

const images = {
    whiteKing: whiteKing,
    whiteQueen: whiteQueen,
    whiteRook: whiteRook,
    whiteKnight: whiteKnight,
    whiteBishop: whiteBishop,
    whitePawn: whitePawn,
    blackKing: blackKing,
    blackQueen: blackQueen,
    blackRook: blackRook,
    blackKnight: blackKnight,
    blackBishop: blackBishop,
    blackPawn: blackPawn
}

export default class Piece extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let piece = this.props.piece
        if(piece) {
            return <img src={images[piece.name]} alt={piece.name}/>
        }else return null
    }
}
