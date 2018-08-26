import firebase from 'firebase';

const { REACT_APP_FB_ID, REACT_APP_FB_API_KEY, REACT_APP_SENDER_ID } = process.env;

export const appName = REACT_APP_FB_ID;

const config = firebase.initializeApp({
  apiKey: REACT_APP_FB_API_KEY,
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: REACT_APP_SENDER_ID,
});

export default config;
