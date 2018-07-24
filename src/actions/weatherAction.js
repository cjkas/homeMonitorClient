export default function weatherAction(url) {
    return (dispatch) => {
        dispatch({type: 'FETCH_WEATHER_START'});
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((probe) => dispatch({type: 'FETCH_WEATHER_SUCCESS', payload: probe}))
            .catch((err) => dispatch({type: 'FETCH_WEATHER_ERROR', error: err}));
    };
}