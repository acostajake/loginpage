import React, { Component } from "react";
import "./App.css";
import firebase, { auth } from "./firebase";
import GMLogin from './GMLogin';
import FBLogin from './FBLogin';
import TWLogin from './TWLogin';
import Logout from './Logout';
import EmailLogin from './EmailLogin';
import UpdateEmail from './UpdateEmail';
import Countdown from './Countdown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: "",
      username: "",
      items: [],
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
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    };
    itemsRef.push(item);
    this.setState({
      currentItem: "",
      user: ""
    });
  }

  componentDidMount() {
    //persist login on page refresh
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <h1>Test App -- Logins!</h1>
            {this.state.user ? (
              <div>
                <Logout />
                <UpdateEmail />
                <Countdown />
              </div>
            ) : (
              <div>
                <EmailLogin />
                <GMLogin />
                <TWLogin />
                <FBLogin />
              </div>
            )}
          </div>
        </header>
        {this.state.user ? (
          <div>
            <div className="user-profile">
              <img src={this.state.user.photoURL} />
            </div>
          </div>
        ) : (
          <div>
            <p>You must be logged in to see the potluck list and submit to it.</p>
          </div>
        )}
        <div>
          <section>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="What's your name?"
                onChange={this.handleChange}                
                value={this.state.username}
              />
              <input
                type="text"
                name="currentItem"
                placeholder="What are you bringing?"
                onChange={this.handleChange}
                value={this.state.currentItem}
              />
              <button>Add Item</button>
            </form>
          </section>
          <section>
            <div>
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.id}>
                      <h3>{item.title}</h3>
                      <p>brought by: {item.user}
                        {item.user === this.state.user.displayName || item.user === <div>You!</div> ?
                        <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div> 
      </div>
    );
  }
}
export default App;
