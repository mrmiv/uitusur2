import {GET_DOMAIN_LOCATION} from '../actions/types';

// TOGGLE NAV BAR

export const SetDomainLocation = domain => {
    return {
        type: GET_DOMAIN_LOCATION,
        payload: {domain}
    }
}