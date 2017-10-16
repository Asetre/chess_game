import React from 'react'

export default class Piece extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.piece) {
            return(
                <h3>{this.props.piece.name}</h3>
            )
        }else return null
    }
}
