import { useState } from "react";
import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase";
import FormInput from "../form-input/form-input";
import Button from "../button/button";


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password doesnt match");
            return;
        }

        try {
            const {user} = await createUserAuthWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});

        } catch (error) {

            if(error.code === "auth/email-already-in-use"){
                alert("Email already in use");
            }
            else
                alert("Error occured");

            console.log(error);  
        }
       

    };

    return(
        <div>
            <h1>Sign Up With Your Email and Password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text"
                    required
                    name="dispalyName"
                    value={displayName}
                    onChange={handleChange}    
                />

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

                <FormInput 
                    label="Confirm Password"
                    type="password"
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}    
                />

                <Button type="submit">SIGN UP</Button>
            </form>
        </div>
    );
   
};

export default SignUpForm;