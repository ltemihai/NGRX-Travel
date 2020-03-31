import {IDestination} from "../../../commons/IDestination";
import {Action, createReducer, on} from "@ngrx/store";

import * as destinationActions from '../actions/destinations.actions';

export const DESTINATIONS_REDUCER_KEY = 'destinationsReducer';

export interface DestinationsState {
    destinations: IDestination[];
    destination: IDestination;
    isLoading: boolean;
    error: any;
}

export const initialState: DestinationsState = {
    destinations: [],
    destination: null,
    isLoading: false,
    error: null
};

const destinationsReducer = createReducer(
    initialState,
    on(destinationActions.loadDestinations, state => ({
        ...state,
        destinations: [],
        isLoading: true
    })),
    on(destinationActions.loadDestinationsSuccess, (state, {data}) => ({
        ...state,
        destinations: data,
        isLoading: false,
    })),
    on(destinationActions.loadDestinationsFailed, (state, {error}) =>({
        ...state,
        isLoading: false,
        error: error
    }))
);


export function reducer(state: DestinationsState, action: Action) {
    return destinationsReducer(state, action);
}

