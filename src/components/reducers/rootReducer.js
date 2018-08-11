import { combineReducers } from 'redux';
import promoCodeReducer from './promoCodesReducer';

const rootReducer = combineReducers({
  promoCode: promoCodeReducer
})

export default rootReducer