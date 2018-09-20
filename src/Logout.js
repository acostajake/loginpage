import React, { Component } from 'react';
import firebase, { auth } from './firebase.js';

class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            user: null
        }
        this.logout = this.logout.bind(this);
    }        

    //logs out of app but does not see user...
    logout() {
        auth.signOut().then(() => {
          this.setState({
            user: null
          })
          .catch((error) => {
            console.log('uh oh error!: ', error)
          })
        });
      }

      render() {
          return (
            <button onClick={this.logout}>Log Out</button> 
            )
      }
}

export default Logout;