import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = { 
  apiKey : "AIzaSyA0hP_QjIjMATISIBSE9odT7C-otuhyVAo" , 
  authDomain : "kl-ecom.firebaseapp.com" , 
  projectId : "kl-ecom" , 
  storageBucket : "kl-ecom.appspot.com" , 
  messagingSenderId : "66067006814" , 
  appId : "1:66067006814:web:3bb5c2039627492e3bbbcf" 
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
