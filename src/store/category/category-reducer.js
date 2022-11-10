import { CATEGORY_ACTION_TYPES } from "./category-type";

const CATEGORY_INTIAL_STATE = {
    categoriesMap : {}
}

export const categoryReducer = (state = CATEGORY_INTIAL_STATE, action={}) => {

    const {type, payload} = action;

    switch(type){
        case CATEGORY_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categoriesMap : payload
            }
        default:
            return state
    }
}