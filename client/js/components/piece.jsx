import React from 'react'
import whiteKing from '../../images/wK.png'

export default class Piece extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(whiteKing)
        if(this.props.piece) {
            return(
                <h3>{this.props.piece.name}</h3>
            )
        }else return null
    }
}
