import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import dotenv from "dotenv"
dotenv.config()
const firebaseConfig = {
  apiKey: "AIzaSyCh4DDs0h6TR9m6B2EfFF7PvFsgTcSg288",
  authDomain: "url-shortner-40f36.firebaseapp.com",
  projectId: "url-shortner-40f36",
  storageBucket: "url-shortner-40f36.appspot.com",
  messagingSenderId: "154310512922",
  appId: "1:154310512922:web:411de23557460037f79ca3",
  measurementId: "G-RVJB068WYC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider };
