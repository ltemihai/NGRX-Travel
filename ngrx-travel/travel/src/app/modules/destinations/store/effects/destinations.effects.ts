import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DestinationsService} from "../../services/destinations.service";

import * as destinationsActions from "../actions/destinations.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {IDestination} from "../../../commons/IDestination";

@Injectable()
export class DestinationsEffects {

    constructor(
        private actions$: Actions,
        private destinationsService: DestinationsService
    ) {}

    loadDestinations$ = createEffect(() => this.actions$.pipe(
        ofType(destinationsActions.loadDestinations),
        mergeMap(() => this.destinationsService.getAllDestinations()
            .pipe(
                map((destinations: any) => destinationsActions.loadDestinationsSuccess({data: destinations})),
                catchError(error => of(destinationsActions.loadDestinationsFailed({error})))
            ))
        )
    );

    addDestination$ = createEffect(() => this.actions$.pipe(
        ofType(destinationsActions.addDestination),
        mergeMap((data: any) => this.destinationsService.addDestination(data)
            .pipe(
                map(() => destinationsActions.addDestinationSuccess()),
                catchError(error => of(destinationsActions.addDestinationFailed({error})))
            ))
        )
    );



}
