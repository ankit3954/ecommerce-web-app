import { initializeApp } from "firebase/app";
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from "firebase/firestore";

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

export const addCollectionsAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionsRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionsRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};


export const getCollectionsAndDocuments = async() => {
  const collectionsRef = collection(db, "categories");
  const q = query(collectionsRef);
  // console.log(q);

  const querySnapShot = await getDocs(q);
 // console.log(querySnapShot.docs[0].data());

  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
      const {items, title} = docSnapShot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

  const userDocRef = doc(db, "users", userAuth.uid);  // checking that in db user with particular uid present or not.
  // console.log(userDocRef);

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

export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListener = (callBack) => {
    onAuthStateChanged(auth, callBack);
};