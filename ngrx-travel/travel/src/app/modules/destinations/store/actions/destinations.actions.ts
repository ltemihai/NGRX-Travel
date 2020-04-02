import {createAction, props} from '@ngrx/store'
import {IDestination} from "../../../commons/IDestination";

/// LOAD DESTINATIONS ACTIONS

export const loadDestinations = createAction(
    '[Destinations] Load Destinations'
);

export const loadDestinationsSuccess = createAction(
    '[Destinations] Load Destinations Success',
    props<{ data: IDestination[] }>()
);

export const loadDestinationsFailed = createAction(
    '[Destinations] Load Destinations Failure',
    props<{ error: any }>()
);

/// LOAD DESTINATION ACTIONS

export const loadDestination = createAction(
    '[Destinations] Load Destination',
    props<{ id: number }>()
);

export const loadDestinationSuccess = createAction(
    '[Destinations] Load Destination Success',
    props<{ data: IDestination }>()
);

export const loadDestinationFailed = createAction(
    '[Destinations] Load Destination Failure',
    props<{ error: any }>()
);

/// ADD DESTINATION ACTIONS
export const addDestination = createAction(
    '[Destinations] Add Destination',
    props<{ data: IDestination }>()
);

export const addDestinationSuccess = createAction(
    '[Destinations] Add Destination Success',
);

export const addDestinationFailed = createAction(
    '[Destinations] Add Destination Failure',
    props<{ error: any }>()
);

