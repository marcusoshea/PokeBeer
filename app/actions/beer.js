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

export const editBeer = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.editBeer,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        console.info('ttt', res);
        return res;
      }
    })
}


export const addBeer = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.addBeer,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        console.info('ttt', res);
        return res;
      }
    })
}
