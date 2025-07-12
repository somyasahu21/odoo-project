import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCDpwypgwCc71y5y86_Jm1MWxRaYmpiK_A",
  authDomain: "loginevently.firebaseapp.com",
  projectId: "loginevently",
  storageBucket: "loginevently.appspot.com", 
  messagingSenderId: "655776618397",
  appId: "1:655776618397:web:7fbb9d7ddeb56d8d704174"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
