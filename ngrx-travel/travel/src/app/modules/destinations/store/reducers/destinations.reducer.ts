import {IDestination} from "../../../commons/IDestination";
import {Action, createReducer, on} from "@ngrx/store";

import * as destinationActions from '../actions/destinations.actions';
import {state} from "@angular/animations";

export const DESTINATIONS_REDUCER_KEY = 'destinationsReducer';

export interface DestinationsState {
    destinations: IDestination[];
    destination: IDestination;
    isDestinationLoading: boolean;
    isDestinationAdding: boolean
    isDestinationAdded: boolean;
    error: any;
}

export const initialState: DestinationsState = {
    destinations: [],
    destination: null,
    isDestinationLoading: false,
    isDestinationAdding: false,
    isDestinationAdded: false,
    error: null
};

const destinationsReducer = createReducer(
    initialState,
    on(destinationActions.loadDestinations, state => ({
        ...state,
        destinations: [],
        isDestinationLoading: true
    })),
    on(destinationActions.loadDestinationsSuccess, (state, {data}) => ({
        ...state,
        destinations: data,
        isDestinationLoading: false,
    })),
    on(destinationActions.loadDestinationsFailed, (state, {error}) =>({
        ...state,
        isDestinationLoading: error,
        error: error
    })),
    on(destinationActions.addDestination, state => ({
        ...state,
        isDestinationAdded: false,
        isDestinationAdding: true,
    })),
    on(destinationActions.addDestinationSuccess, state => ({
        ...state,
        isDestinationAdded: true,
        isDestinationAdding: false,
    })),
    on(destinationActions.addDestinationFailed, (state, {error}) => ({
        ...state,
        isDestinationAdded: false,
        isDestinationAdding: false,
        error: error
    }))
);


export function reducer(state: DestinationsState, action: Action) {
    return destinationsReducer(state, action);
}

