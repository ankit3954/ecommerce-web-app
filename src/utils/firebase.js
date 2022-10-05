import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-qyksLflKMWvKRgaIglTQcZj2PrlltPg",
  authDomain: "ecommerce-website-db-96c9a.firebaseapp.com",
  projectId: "ecommerce-website-db-96c9a",
  storageBucket: "ecommerce-website-db-96c9a.appspot.com",
  messagingSenderId: "681164224921",
  appId: "1:681164224921:web:35a54fb0e1862ddc973b08"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});


const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);


export {auth,signInWithGooglePopup,signInWithGoogleRedirect};


const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  const userDocRef = doc(db, "users", userAuth.uid);  // checking that in db user with particular uid present or not.
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef); //getting a data of userDocRef


  if(!userSnapShot.exists()){           // if data doesnt exist then we set the doc
    
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("Error at creating user doc.", error.message);
    }
   
  }

  return userDocRef;                   //else return the existing data.
}

export const createUserAuthWithEmailAndPassword = async (email, password) => {

  if(!email || !password)
  return;

   return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if(!email || !password)
  return;

  return await signInWithEmailAndPassword(auth, email, password);
};