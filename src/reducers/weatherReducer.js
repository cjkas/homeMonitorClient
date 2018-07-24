const initialState = {
    loading: false,
    error: null,
    probe: null
};
const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WEATHER_START':
            return {...state, loading: true};
        case 'FETCH_WEATHER_ERROR':
            return {...state, loading: false, error: action.payload};
        case 'FETCH_WEATHER_SUCCESS':
            return {...state, loading: false, probe: action.payload};
        default:
            return state;
    }
};
export default weatherReducer;