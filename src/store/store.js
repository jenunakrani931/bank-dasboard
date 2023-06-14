import { createStore, applyMiddleware,combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk'; 
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import bookReducer from './reducers/bookReducer';
import authorReducer from './reducers/authorReducer';
const rootReducer = combineReducers({
    product: productReducer,
    category: categoryReducer,
    auth:authReducer,
    book:bookReducer,
    author:authorReducer,
  });
  
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;