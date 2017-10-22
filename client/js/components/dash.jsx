import React from 'react'

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="dashboard">
                <h2>Username</h2>
                <div className="user-info">
                    <ul>
                        <li>Wins</li>
                        <li>Loss</li>
                        <li>MoreInfo</li>
                    </ul>
                </div>
            </div>
        )

    }
}
//const mapStateToProps = (state, ownProps) => {
//    return  {
//    }
//}
//
//const mapDispatchToProps = dispatch -> {
//    return {
//    }
//}
//
//export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
