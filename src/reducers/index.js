import {combineReducers} from 'redux';

import cinemas from './cinemas';
import auth from './auth';

export default combineReducers({ cinemas, auth });