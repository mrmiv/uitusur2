import {OPEN_NAV, CLOSE_NAV} from '../actions/types';

// TOGGLE NAV BAR

export const openNavbar =() => {
    return {
        type: OPEN_NAV,
        payload: {open: true}
    }
}

export const closeNavbar =() => {
    return {
        type: CLOSE_NAV,
        payload: {open: false}
    }
}