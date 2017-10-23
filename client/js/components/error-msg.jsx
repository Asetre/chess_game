import React from 'react'

export default class ErrorMsg extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <h3 className="err-msg">{this.props.msg}</h3>
        )
    }
}
