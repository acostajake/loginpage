import React, { Component } from "react";
import firebase, { auth } from "./firebase.js";


    //Logs in new user with email and password
class EmailLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let email = this.state.email;
    let password = this.state.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(email, password);
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      let user;
      const userLogin = firebase.database().ref("EmailPass");
      const newUser = {
        email: this.state.email,
        pass: this.state.password
      };
      userLogin.push(newUser);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email here..."
          onChange={this.handleChange}
          value={this.state.email}
        />
        <input
          type="text"
          name="password"
          placeholder="Password..."
          onChange={this.handleChange}
          value={this.state.password}
        />
        <button>Sign Up</button>
      </form>
    );
  }
}

export default EmailLogin;
