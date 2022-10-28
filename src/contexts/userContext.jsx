import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase";


export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null
});


const userReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser:payload
            }
        default:
            throw new Error(`Unhandled type ${Error} in userReducer`)
    }
};

const IntialState = () =>{
    return {
        currentUser:null
    }
};

export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, IntialState);

    const {currentUser} = state;

    const setCurrentUser = (user) =>{
        dispatch({type:"SET_CURRENT_USER", payload:user});
    }


    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);

        });

        return unsubscribe;
    }, []);


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};