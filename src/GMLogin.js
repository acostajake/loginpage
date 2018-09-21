import React, { Component } from 'react';
import firebase, { auth, gmprovider } from './firebase.js';

    //Logs in user with Google Auth
class GMLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            user: null
        }
        this.gmlogin = this.gmlogin.bind(this);
    }        

    gmlogin() {
        auth.signInWithPopup(gmprovider).then(result => {
          const user = result.user;
          this.setState({ user });
          console.log(
            result.user.email,
            result.user.photoURL,
            result.user.displayName
          );
        });
      }

      render() {
          return (
            <button onClick={this.gmlogin}>Google login</button>    
          )
      }
}

export default GMLogin;