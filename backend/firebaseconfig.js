import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import dotenv from "dotenv"
dotenv.config()
const firebaseConfig = {
  apiKey: process.env.fireapikey,
  authDomain: process.env.fireauthDomain,
  projectId: process.env.fireprojectId,
  storageBucket: process.env.firestorageBucket,
  messagingSenderId: process.env.firemessagingSenderId,
  appId:process.env.fireappId ,
  measurementId: process.env.firemeasurementId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, GoogleAuthProvider };
