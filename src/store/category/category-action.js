import { CreateAction } from "../../utils/reducers/createAction"
import { CATEGORY_ACTION_TYPES } from "./category-type"

export const setCategories = (categoriesArray) => {
    return CreateAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
}