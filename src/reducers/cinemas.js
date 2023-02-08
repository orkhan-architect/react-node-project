export default (state = { isLoading: true, cinemas: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case "FETCH_ALL":
            return {
                ...state,
                cinemas: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case "CREATE":
            return { ...state, cinemas: [...state.cinemas, action.payload] };
        case "UPDATE":
        case "LIKE":
            return { ...state, cinemas: state.cinemas.map((cinema) => (cinema._id === action.payload._id ? action.payload : cinema)) };
        case "DELETE":
            return { ...state, cinemas: state.cinemas.filter((cinema) => cinema._id !== action.payload) };
        case "FETCH_BY_SEARCH":
            return { ...state, cinemas: action.payload };
        case "FETCH_CINEMA":
            return { ...state, cinema: action.payload.cinema };
        case "COMMENT":
            return {
                ...state,
                cinemas: state.cinemas.map((cinema) => {
                if(cinema._id == +action.payload._id) return action.payload;
                return cinema;
                }),
            };
        
        default:
            return state;
    }
}