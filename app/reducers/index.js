// Imports: Reducers
import auth from './auth';
import common from './common';
import beer from './beer';
import { reducer as formReducer } from 'redux-form';

// Redux: Root Reducer
const rootReducer = {
  auth: auth,
  common: common,
  beer: beer,
  form: formReducer
};

// Exports
export default rootReducer;