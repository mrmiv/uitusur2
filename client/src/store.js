import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/index'

const saveState = (state) => {
    try {
        // Convert the state to a JSON string 
        const serialisedState = JSON.stringify(state);

        // Save the serialised state to localStorage against the key 'app_state'
        window.sessionStorage.setItem('app_state', serialisedState);
    } catch (err) {
        // Log errors here, or ignore
    }
};

const loadState = () => {
    try {
        // Load the data saved in localStorage, against the key 'app_state'
        const serialisedState = window.sessionStorage.getItem('app_state');

        // Passing undefined to createStore will result in our app getting the default state
        // If no data is saved, return undefined
        if (!serialisedState) return undefined;

        // De-serialise the saved state, and return it.
        return JSON.parse(serialisedState);
    } catch (err) {
        // Return undefined if localStorage is not available, 
        // or data could not be de-serialised, 
        // or there was some other error
        return undefined;
    }
};

// const initialStore = {}
const oldState = loadState();

const middleware = [thunk]

const store = createStore(rootReducer, oldState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ 
        ? window.__REDUX_DEVTOOLS_EXTENSION__() 
        : (a) => a
))

store.subscribe(() => {
    saveState(store.getState());
});

export default store