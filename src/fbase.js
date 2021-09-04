// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
// import { getAuth } from 'firebase/auth';
import * as authService from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROJECT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROJECT_MEASSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROJECT_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const auth = authService.getAuth();

export default authService;
