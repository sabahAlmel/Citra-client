import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
    apiKey: "AIzaSyDVE4KeY_O7fgqySbA8W1dbtF6uVSRfpGU",
    authDomain: "tripoli-ctra.firebaseapp.com",
    projectId: "tripoli-ctra",
    storageBucket: "tripoli-ctra.appspot.com",
    messagingSenderId: "1096561604077",
    appId: "1:1096561604077:web:1951ba151602ba4470a3e4",
    measurementId: "G-MCG8EB6T2W"
  };

   export const app = initializeApp(firebaseConfig)
  export const auth = getAuth(app)
  export const provider = new GoogleAuthProvider();