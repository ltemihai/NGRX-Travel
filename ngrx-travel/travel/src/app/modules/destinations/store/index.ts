import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DestinationsState} from "./reducers/destinations.reducer";

import * as destinationReducer from "./reducers/destinations.reducer";

export const selectDestinationsState = createFeatureSelector<DestinationsState>(destinationReducer.DESTINATIONS_REDUCER_KEY);
export const getDestinations = createSelector(selectDestinationsState, (state: DestinationsState) => state.destinations);
export const getLoadedDestination = createSelector(selectDestinationsState, (state: DestinationsState) => state.destination);
export const isLoading = createSelector(selectDestinationsState, (state: DestinationsState) => state.isLoading);
