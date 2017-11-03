import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import cqOne from '../../images/cb-conqueror.gif'
import knOne from '../../images/cb-knight.gif'

export default class Landing extends React.Component {
    render() {
        return (
            <div className="main-landing">
                <div className="main-landing-content">
                    <div className="header-container">
                        <h1>Chess Battles</h1>
                        <p>Choose a class and battle other players! The same rules of chess apply except each class has it's own advantages!</p>
                        <Link to='login'>
                            <button className="l-login">login</button>
                        </Link>
                        <h6>or</h6>
                        <Link to='signup'>
                            <button className="l-signup">Signup</button>
                        </Link>
                    </div>
                    <div className="news-container">
                        <h3>News</h3>
                        <div className="horizontal-line"></div>
                        <div className="news-item">
                            <h5>New Class</h5>
                            <h4>Conqueror</h4>
                            <p>Who said the king is the weakest piece on the board? "Jump" into battle with the conqueror!</p>
                            <img className="news-class-img" src={cqOne} alt="Conqueror-One"/>
                        </div>
                        <div className="news-item">
                            <h5>New Class</h5>
                            <h4>Knight</h4>
                            <p>Give your knight some more flexibility by being able to move straight!</p>
                            <img className="news-class-img" src={knOne} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
