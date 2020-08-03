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
      dispatch({ type: ActionTypes.LOGOUT});
      dispatch(NavigationActions.navigate({ routeName: Screens.SignOutStack.route }));
      console.log("ERROR: ====", err);
    });
}

export const editBeer = (payloads, userId, token) => dispatch => {
  var postUrl = url.editBeer + userId;
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  var headers = {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${token}`
  }
  return axios.put(postUrl, {payloads,  headers})
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
    }).catch((err) => {
      dispatch({ type: ActionTypes.LOADING, isLoading: false });
      console.log("ERROR: ====", err);
    });
  }

export const throwAwayBeer = (userId, beerId, token) => dispatch => {
  var postUrl = url.deleteBeer + '/'+ userId + '/' + beerId;
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  var headers = {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${token}`
  }
  return axios.delete(postUrl, {headers})
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
    }).catch((err) => {
      dispatch({ type: ActionTypes.LOADING, isLoading: false });
      console.log("ERROR: ====", err);
    });
  }

export const addBeer = (payloads, userId, token) => dispatch => {
  var postUrl = url.addBeer + userId;
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  var headers = {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${token}`
  }
  return axios.post(postUrl, {payloads,  headers})
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
    if(res.status == 200){
      return res.data;
    } else {
      return res;
    }
    }).catch((err) => {
      dispatch({ type: ActionTypes.LOADING, isLoading: false });
      console.log("ERROR: ====", err);
    });
  }