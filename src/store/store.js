import {compose, applyMiddleware, createStore} from "redux";
import { logger } from "redux-logger";

import { rootReducer } from "./root-reducers";

const middleWares = [logger];

const composedEnhancer = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancer);