import { CreateAction } from "../../utils/reducers/createAction";

export const setCurrentUser = (user) =>{
    return CreateAction("SET_CURRENT_USER",user);
}