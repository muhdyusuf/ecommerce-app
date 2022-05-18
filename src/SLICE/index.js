import { combineReducers,reducer } from 'redux'

import authReducer from './authSlice'
import likedReducer from './likedSlice'
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import checkoutReducer from './checkoutSlice'
import utilsReducer from './utilsSlice'

const rootReducer=combineReducers({
    authState:authReducer,
    likedState:likedReducer,
    cartState:cartReducer,
    userState:userReducer,
    checkoutState:checkoutReducer,
    utilsState:utilsReducer

})

export default rootReducer