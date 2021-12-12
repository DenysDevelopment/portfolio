import { combineReducers } from 'redux';
import { isAuthReducer as auth } from './isAuth';
import { userDataReducer as userData } from './userData';
import { listUsers } from './listUsers';

export const rootReducer = combineReducers({ auth, userData, listUsers });
