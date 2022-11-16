import { CATEGORY_ACTION_TYPES } from "./category-type";

const CATEGORY_INTIAL_STATE = {
    categories : []
}

export const categoryReducer = (state = CATEGORY_INTIAL_STATE, action={}) => {

    const {type, payload} = action;

    switch(type){
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories : payload
            }
        default:
            return state
    }
}