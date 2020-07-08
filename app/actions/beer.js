import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';

export const getBeers = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  var headers = {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${payloads}`
  }

  return axios.get(url.getBeers, {payloads,  headers})
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.GETBEERS, data: res.data });
        return res.data
      } else {
        dispatch({ type: ActionTypes.LOADING, isLoading: false });
        return
      }
    }).catch((err) => {
      console.log("ERROR: ====", err);
    });
}
