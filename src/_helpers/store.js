import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunkMiddleware from "redux-thunk"
import combinedReducer from "../_reducers"

let middlewares = [thunkMiddleware]

export const store = createStore(combinedReducer, undefined, composeWithDevTools(applyMiddleware(...middlewares)))

export default { store }
