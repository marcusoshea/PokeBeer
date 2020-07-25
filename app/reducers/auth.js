// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case ActionTypes.RESETSTATE: {
      return initialState.auth
    }
    case ActionTypes.SIGNIN: {
      return {
        ...state,
        user: action.data.username,
        token: action.data.token,
        userId: action.data.id
      }
    }
    case ActionTypes.SIGNUP: {
      return {
        ...state,
      }
    }
    case ActionTypes.LOGOUT: {
      return {
        ...state,
        user: null,
        token: null,
        userId: null
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default auth;