// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCdSe6RYuMh-yEgvgmCAIXf8MkNYVXK0Rs',
  authDomain: 'xmas-6ecf1.firebaseapp.com',
  projectId: 'xmas-6ecf1',
  storageBucket: 'xmas-6ecf1.appspot.com',
  messagingSenderId: '253163049109',
  appId: '1:253163049109:web:c82308d40193c888bacb9c',
  measurementId: 'G-XRP4H3BQ1S',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
