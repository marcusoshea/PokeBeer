// Initial State
import { initialState } from './initial';
import { ActionTypes } from '../constants/';

// Reducers (Modifies The State And Returns A New State)
const beer = (state = initialState.beer, action) => {
  switch (action.type) {
    case ActionTypes.GETBEERS: {
      return {
        ...state,
        beerList: action.data
      }
    }
    case ActionTypes.SELECTEDBEER: {
      return {
        ...state,
        selectedBeer: action.data
      }
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default beer;