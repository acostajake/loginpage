import React, { Component } from 'react';
import firebase, { twprovider } from './firebase.js';

    //Logs in user with Twitter; does NOT store email - users displayName instead.
class TWLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            user: null
        }
        this.twlogin = this.twlogin.bind(this);
    }        

    twlogin() {
        firebase.auth().signInWithPopup(twprovider).then(function(result) {
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          var user = result.user;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      }

      render() {
          return (
            <button onClick={this.twlogin}>Twitter Login</button>    
          )
      }
}

export default TWLogin;