import firebase from "firebase";

const config = {
  secret
firebase.initializeApp(config);

// export const provider = new firebase.auth.signInWithEmailAndPassword();
export const gmprovider = new firebase.auth.GoogleAuthProvider();
export const fbprovider = new firebase.auth.FacebookAuthProvider();
export const twprovider = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();
export default firebase;
