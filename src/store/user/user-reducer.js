import { USER_ACTION_TYPES } from "./user-types";

const USER_INTIAL_STATE = () =>{
    return {
        currentUser:null
    }
};



export const userReducer = (state = USER_INTIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser:payload
            }
        default:
            return state;
    }
};

