import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import  {getFirestore} from 'firebase/firestore'

export const firebase = initializeApp({

  apiKey: "AIzaSyD8x4TTGsenlQN07P6R__Pq9OaycC3xIEA",

  authDomain: "twotter-b47f4.firebaseapp.com",

  projectId: "twotter-b47f4",

  storageBucket: "twotter-b47f4.appspot.com",

  messagingSenderId: "241228046750",

  appId: "1:241228046750:web:7de557077af051d706368f"

});

export const auth = getAuth(firebase)

export const db = getFirestore(firebase)




