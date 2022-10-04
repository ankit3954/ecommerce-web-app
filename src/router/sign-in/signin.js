import {auth, signInWithGoogleRedirect, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase";
import { useEffect } from "react";
import {getRedirectResult} from "firebase/auth";
import SignUpForm from "../../components/sign-up/sign-up";

const SignIn = () => {

    useEffect( () => async () => {
        const response = await getRedirectResult(auth);
        if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }

    }, []);

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

   
    return (
        <div>
            <h1>Sign In Page.</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;