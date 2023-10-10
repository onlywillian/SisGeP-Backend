// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsT_XjScSdqeqm92IWhjBYQaSBSd5whxk",
  authDomain: "sisgep-7bc34.firebaseapp.com",
  projectId: "sisgep-7bc34",
  storageBucket: "sisgep-7bc34.appspot.com",
  messagingSenderId: "35711298085",
  appId: "1:35711298085:web:29e6378acd1aa52206edcc"
};

// Initialize Firebase  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;