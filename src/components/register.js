import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
        this.handleInput = this.handleInput.bind(this);
        this.register = this.register.bind(this);
    }
    handleInput = (event) => {
        const input = event.target.id;
        const value = event.target.value;
        this.setState({ [input]: value });
    }
    register = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3002/users/register', this.state).then(response => {
        });
        this.props.history.push('/login')

    }
    render() {
        return (
            <>
            <div className="signup-form">
            <form>
              <h2>Register</h2>
              <p className="hint-text">Create your account. It's free and only takes a minute.</p>
                  <div className="form-group">
                    <input type="email" id="email" onChange={this.handleInput} className="form-control" placeholder="Email" required="required"/>
                  </div>
              <div className="form-group">
                      <input type="password" id="password"  onChange={this.handleInput} className="form-control" placeholder="Password" required="required"/>
                  </div>
              <div className="form-group">
                      <button type="submit" onClick={this.register} className="btn btn-success btn-lg btn-block">Register Now</button>
                  </div>
              </form>
            <div className="text-center">Already have an account? <Link to="/login">Sign in</Link></div>
            </div>
            

            </>
        );
    }
}
export default Register;
