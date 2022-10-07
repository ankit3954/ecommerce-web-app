import { useState } from "react";
import { signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase";


import FormInput from "../form-input/form-input";
import Button from "../button/button";
import "./sign-in.scss"

const defaultFormFields = {
    email: "",
    password: ""
};

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch(error.code){
                case "auth/wrong-password":
                    alert("incorrect password");
                    break;
                case "auth/user-not-found":
                    alert("user not found/no user associated with this email");
                    break;
                default:
                    console.log(error);
            }
        
        };
    }

    
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
      
    }

    return(
        <div className="sign-in-container">
            <h1>Already have an account.</h1>
            <span>Sign In With Your Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleChange}    
                />

                <FormInput 
                    label="Password"
                    type="password"
                    required
                    name="password"
                    value={password}
                    onChange={handleChange}    
                />

                <div className="buttons-container">
                    <Button onClick={handleSubmit} type="submit">SIGN IN</Button>
                    <Button buttonType="google" onClick={signInWithGoogle} type="button">GOOGLE SIGN IN</Button>
                </div>
                
            </form>
        </div>
    );
      
};

export default SignInForm;