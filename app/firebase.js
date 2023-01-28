import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDlRiPZj47imolfXCrksVxA_2h-5FscWJs',
  authDomain: 'messaging-8a3a2.firebaseapp.com',
  projectId: 'messaging-8a3a2',
  storageBucket: 'messaging-8a3a2.appspot.com',
  messagingSenderId: '830311795776',
  appId: '1:830311795776:web:c86a93ef1949ada0ffe3a5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
