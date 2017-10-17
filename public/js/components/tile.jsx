import React from 'react'
import Piece from './piece.jsx'
import {connect} from 'react-redux'

export default class Tile extends React.Component {
    constructor(props){
        super(props)
    }
    tileClicked(tile) {
        //dispatch stuff
    }

    render() {
        return(
            <div className="tile">
                <Piece piece={this.props.tile.piece} /*onClick={this.tileClicked(this.props.tile)} */ />
            </div>
        )
    }
}
