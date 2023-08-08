import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCTBdsPInoTpoklJzZPLqnbJm4C_Bdab8",
  authDomain: "money-minder-e3ec5.firebaseapp.com",
  projectId: "money-minder-e3ec5",
  storageBucket: "money-minder-e3ec5.appspot.com",
  messagingSenderId: "914233661593",
  appId: "1:914233661593:web:b85fa8c3392a03cf214008",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
