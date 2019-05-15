import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'

class Navbar extends Component {
    constructor() {
        super();
            this.state = {
                connectedUser: null
            }
        this.logout = this.logout.bind(this);

    }
    componentDidMount() {
        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token') !== null){
            this.setState({connectedUser: jwt_decode(localStorage.getItem('token')).data })
        }
        else {
            this.setState({ connectedUser: null })
        }
    }
    logout = (event) => {
        event.preventDefault();
        localStorage.clear();
        this.setState({connectedUser: null})
        
    }
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/home">Real time chat</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                <Link className="nav-link" to="/home">Home</Link>
                </li>
                { this.state.connectedUser === null && <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>}
                { this.state.connectedUser === null &&  <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
                </li>}
                { this.state.connectedUser &&  <li className="nav-item">
                <Link className="nav-link">  Hello {this.state.connectedUser.email} </Link>
                </li>}
                <li className="nav-item">
                <Link className="nav-link" to="/chat">Chat</Link>
                </li>
                { this.state.connectedUser &&  <li className="nav-item">
                <Link onClick={this.logout} className="nav-link"> Logout </Link>
                </li>}
              </ul>
            </div>
          </nav>
        );
    }
}
export default Navbar;
