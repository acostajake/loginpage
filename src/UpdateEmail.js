import React, { Component } from "react";
import firebase, { auth } from "./firebase.js";


    //replaces current user's email in Firebase db 
    //and keeps them logged in with new email
    //works for EmailPass, Google, Twitter, and FB
class UpdateEmail extends Component {
    constructor(props) {
      super(props);
      this.state = {
        newemail: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      let user = firebase.auth().currentUser;
      let newemail = this.state.newemail;
      user.updateEmail(newemail).then(() => {
      }).catch((error) => {
        console.log('error in update email: ', error)
      })
    }

    componentDidMount() {
      auth.onAuthStateChanged(user => {
        if(user) {
          console.log("update email func: ", user)
        }
      })
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <input type="text" 
              name="newemail" 
              placeholder="new email..." 
              onChange={this.handleChange} 
              value={this.state.newemail} 
            />
            <button>Update Email</button>
        </form>
      );
    }
  }
  
  export default UpdateEmail;
  