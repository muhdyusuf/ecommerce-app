import { combineReducers,reducer } from 'redux'

import authReducer from './authSlice'
import likedReducer from './likedSlice'
import cartReducer from './cartSlice'
import userReducer from './userSlice'

const rootReducer=combineReducers({
    authState:authReducer,
    likedState:likedReducer,
    cartState:cartReducer,
    userState:userReducer

})

export default rootReducer