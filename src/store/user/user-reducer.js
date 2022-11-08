const IntialState = () =>{
    return {
        currentUser:null
    }
};



export const userReducer = (state = IntialState, action) => {
    const {type, payload} = action;

    switch(type){
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser:payload
            }
        default:
            return state;
    }
};

