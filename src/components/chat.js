import React, { Component } from 'react';
import './chat.css'
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import socketIOClient from "socket.io-client";


class Chat extends Component {
    constructor() {
        super();
        this.state = {
            content: "",
            conversation: "",
            listeUsers: [],
            chosenUser: "",
            listeMessages: [],
            connectedUser: "",
            endpoint: "http://localhost:3002"
        }
        this.handleInput = this.handleInput.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }
    handleInput = (event) => {
        const input = event.target.id;
        const value = event.target.value;
        this.setState({ [input]: value });
    }
    sendMessage = (event) => {
        event.preventDefault();
        const message = {content: this.state.content, user: this.state.connectedUser};
        axios.post('http://localhost:3002/chat/sendMessage/' + this.state.conversation , message , {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then(response => {
            this.props.history.push('/login')
        });
    }
    componentDidMount() {
      this.setState({connectedUser: jwt_decode(localStorage.getItem('token')).data._id})
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("newMessageSended", data => {
        this.clickUser(this.state.chosenUser);

      });
      socket.on("newUserAdded", data => {
        axios.get('http://localhost:3002/users/getListeUsers' , {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).then(response => {
        this.setState({listeUsers: response.data.filter(obj => obj._id !== this.state.connectedUser)})
        this.clickUser(response.data[0]._id)
      })
      });
      axios.get('http://localhost:3002/users/getListeUsers' , {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).then(response => {
        this.setState({listeUsers: response.data.filter(obj => obj._id !== this.state.connectedUser)})
        this.clickUser(response.data[0]._id)
      })
    }
    clickUser = (idUser) => {
      console.log(idUser);
      this.setState({chosenUser: idUser});
      axios.get('http://localhost:3002/chat/getPrivateMessage/' + idUser + '/' + this.state.connectedUser , {
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
      } ).then(response => {
        this.setState({conversation: response.data._id, listeMessages: response.data.messages})
      });
    }
    render() {
        return (
            <>
            <div className="container">
            <h3 className=" text-center">Messaging</h3>
            <div className="messaging">
              <div className="inbox_msg">
                <div className="inbox_people">
                  <div className="headind_srch">
                    <div className="recent_heading">
                      <h4>Recent</h4>
                    </div>
                  </div>
                  <div className="inbox_chat" >
                    <div className="chat_list">
                    {this.state.listeUsers.map((el,i) => (
                      <div className="chat_people" key={el._id} onClick={() => this.clickUser(el._id)}>
                        <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
                        <div className="chat_ib">
                          <h5>{el.email}</h5>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                <div className="mesgs" >
                  <div className="msg_history" >
                  {this.state.listeMessages.map((el,i) => (
                    <>
                    {el.user !== this.state.connectedUser && <div className="incoming_msg ">
                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                      </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>{el.content}</p>
                          <span className="time_date"> {el.CreatedDate}</span>
                        </div>
                      </div>
                    </div>}
                    {el.user === this.state.connectedUser &&<div className="outgoing_msg ifUserConnected">
                      <div className="sent_msg">
                        <p>{el.content}</p>
                        <span className="time_date"> {el.CreatedDate}</span>
                      </div>
                    </div>}
                  </>
                  ))}
                </div>
                  <div className="type_msg">
                    <div className="input_msg_write">
                      <form>
                      <input type="text" id="content" onChange={this.handleInput} className="write_msg" placeholder="Type a message" />
                      <button className="msg_send_btn" onClick={this.sendMessage} type="submit"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
            

            </>
        );
    }
}
export default Chat;
