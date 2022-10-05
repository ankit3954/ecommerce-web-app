import {auth, signInWithGoogleRedirect, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase";
import { useEffect } from "react";
import {getRedirectResult} from "firebase/auth";
import SignUpForm from "../../components/sign-up/sign-up";
import SignInForm from "../../components/sign-in/sign-in";
import "./authentication.scss"
const Authentication = () => {

    useEffect( () => async () => {
        const response = await getRedirectResult(auth);
        if(response){
            await createUserDocumentFromAuth(response.user);
        }

    }, []);


   
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;