import * as api from '../api';

export const getCinemas = (page) => async(dispatch) => {
    try {
        dispatch({ type: "START_LOADING" });

        const { data: { data, currentPage, numberOfPages } } = await api.fetchCinemas(page);
        dispatch({ type: "FETCH_ALL", payload: { data, currentPage, numberOfPages } });

        dispatch({ type: "END_LOADING" });
    } 
    catch (error) {
        console.log(error.message);
    }    
}

export const createCinema = (cinema, history) => async(dispatch) => {
    try {
        dispatch({ type: "START_LOADING" });

        const {data} = await api.createCinema(cinema);
        history(`/cinemas/${data._id}`);
        dispatch({ type: 'CREATE', payload: data });
    } 
    catch (error) {
        console.log(error.message);
    }    
}

export const updateCinema = (id, cinema) => async(dispatch) => {
    try {
        const {data} = await api.updateCinema(id, cinema);
        dispatch({ type: 'UPDATE', payload: data });
    } 
    catch (error) {
        console.log(error.message);
    }    
}

export const deleteCinema = (id) => async(dispatch) => {
    try {
        await api.deleteCinema(id);
        dispatch({ type: 'DELETE', payload: id });
    } 
    catch (error) {
        console.log(error.message);
    }    
}

export const likeCinema = (id) => async(dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const {data} = await api.likeCinema(id, user?.token);
        dispatch({ type: 'LIKE', payload: data });
    } 
    catch (error) {
        console.log(error.message);
    }    
}

export const getCinemasBySearch = (searchQuery) => async(dispatch) => {
    try {
        dispatch({ type: "START_LOADING" });

        const data = (await api.fetchCinemasBySearch(searchQuery)).data;
        dispatch({ type: "FETCH_BY_SEARCH", payload: data });

        dispatch({ type: "END_LOADING" });
      } 
      catch (error) {
        console.log(error.message);
      }    
}

export const getCinema = (id) => async (dispatch) => {
    try {
      dispatch({ type: "START_LOADING" });
  
      const { data } = await api.fetchCinema(id);
  
      dispatch({ type: "FETCH_CINEMA", payload: { cinema: data } });
    } 
    catch (error) {
      console.log(error.message);
    }
};

export const commentCinema = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: "COMMENT", payload: data });
  
      return data.comments;
    } 
    catch (error) {
      console.log(error.message);
    }
};