import { CreateAction } from "../../utils/reducers/createAction";
import { USER_ACTION_TYPES } from "./user-types";

export const setCurrentUser = (user) =>{
    return CreateAction(USER_ACTION_TYPES.SET_CURRENT_USER , user);
}