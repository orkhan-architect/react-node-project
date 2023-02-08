import * as api from '../api/index.js';

export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.logIn(formData);
    dispatch({ type: "AUTH", data });
    router('/');
  }
  catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: "AUTH", data });
    router('/');
  } 
  catch (error) {
    console.log(error);
  }
};