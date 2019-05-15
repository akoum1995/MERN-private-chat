import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
    }
    handleInput = (event) => {
        const input = event.target.id;
        const value = event.target.value;
        this.setState({ [input]: value });
    }
    login = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3002/users/login', this.state).then(response => {
            localStorage.setItem('token', response.data.access_token);
        });
         this.props.history.push('/chat');
    }
    render() {
        return (
            <>
                <div className="login-form">
                    <form >
                        <h2 className="text-center">Log in</h2>
                        <div className="form-group">
                            <input type="text" id="email" onChange={this.handleInput} className="form-control" placeholder="Email" required="required" />
                        </div>
                        <div className="form-group">
                            <input type="password" id="password" onChange={this.handleInput} className="form-control" placeholder="Password" required="required" />
                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={this.login} className="btn btn-primary btn-block">Log in</button>
                        </div>
                        <div className="clearfix">
                            <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                            <Link to="/login" className="pull-right">Forgot Password?</Link>
                        </div>
                    </form>
                    <p className="text-center"><Link to="/register">Create an Account</Link></p>
                </div>

            </>
        );
    }
}
export default Login;
