import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'


class Home extends Component {
    constructor() {
        super();
            this.state = {
                connectedUser: null
            }
    }
    componentDidMount() {
        console.log(localStorage.getItem('token') !== null);
        
        if(localStorage.getItem('token') !== null){
            this.setState({connectedUser: jwt_decode(localStorage.getItem('token')).data })
        }
        else {
            this.setState({ connectedUser: null })
        }
    }
    render() {
        return (
            <>
            <div className="container">
  <div className="container-fluid">
    <div style={{marginBottom: "2%"}}></div>
    <div className="row">
      <div className="col-md-5"></div>
      <div className=" col-md-6">
        <img src={require('../assets/fivep_logo_black_labs.png')} alt="..." />
      </div>
    </div>
    <div style={{marginBottom: "2%"}}></div>
    <div className="row">
      <div className="col-md-3"></div>
      <div className=" col-md-6 text-center">
        <h1>This is real time private chat</h1>
        <h4>Made with love</h4>
        <h6>By Five Points The Lab</h6>
        { this.state.connectedUser === null && <><Link   className="btn btn-primary" to="/login"> Sign in  </Link> <Link className="btn btn-success" to='/register' > Sing up</Link></>}
        { this.state.connectedUser !== null && <Link   className="btn btn-primary" to="/chat"> Go to chat  </Link>}
      </div>
    </div>

  </div>
</div>
</>
        );
    }
}
export default Home;
