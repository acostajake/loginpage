import React, { Component } from 'react';
import firebase, { auth, fbprovider } from './firebase.js';

class FBLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            user: null
        }
        this.fblogin = this.fblogin.bind(this);
    }        

    fblogin() {
        let user;
        firebase.auth().signInWithPopup(fbprovider).then(function(result) {
          //convert to redirect
          var token = result.credential.accessToken;
          var user = result.user;
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential)
        })
      }

      render() {
          return (
            <button onClick={this.fblogin}>Facebook login</button>    
          )
      }
}

export default FBLogin;