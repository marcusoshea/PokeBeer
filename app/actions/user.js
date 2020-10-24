import axios from '../utils/api';
import url from '../config/api';
import apiConfig from '../config/api';
import storage from '../utils/storage';
import { ActionTypes, Strings } from '../constants/';
import { getLanguage } from '../utils/common';

export const signin = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  var headers = {
    'Content-Type': 'application/json'
  }

  return axios.post(url.signin, {payloads,  headers})
  .then(res => {
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        dispatch({ type: ActionTypes.SIGNIN, data: res.data });
        return res.data
      } else {
        return
      }
    }).catch((err) => {
      console.log("ERROR: ====", err);
    });
}

export const signup = payloads => dispatch => {
  dispatch({ type: ActionTypes.LOADING, isLoading: true });
  return axios.post(url.signup,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
      if(res.status == 200){
        return res.data;
      } else {
        return res;
      }
    })
}

export const logoutUser = () => dispatch => {
  return dispatch({ type: ActionTypes.LOGOUT });
  
}

export const forgotpassword = payloads => dispatch => {
  //dispatch({ type: ActionTypes.LOADING, isLoading: true });
  console.log("payloads", payloads);
  return axios.post(url.getForgotPasswordToken,  {payloads: payloads}).then(res => {
    // console.log("res", res.data);
    dispatch({ type: ActionTypes.LOADING, isLoading: false });
        return res;
    })  
}

