import {compose, applyMiddleware, createStore} from "redux";
// import { logger } from "redux-logger";

import { rootReducer } from "./root-reducers";

const loggerMiddleWare = (store) => (next) => (action) => {
    if(!action.type)
    return next(action);

    console.log("type: ", action.type);
    console.log("payload: ", action.payload);
    console.log("currentState: ", store.getState())

    next(action);

    console.log("newState: ", store.getState());
}

const middleWares = [loggerMiddleWare];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancer);