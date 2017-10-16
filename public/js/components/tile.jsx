import React from 'react'
import Piece from './piece.jsx'

export default class Tile extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className="tile">
                <Piece piece={this.props.tile.piece}/>
            </div>
        )
    }
}
