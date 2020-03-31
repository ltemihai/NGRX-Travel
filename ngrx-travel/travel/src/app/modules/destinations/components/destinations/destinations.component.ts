import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';

import * as destinationsReducer from '../../store/index'
import * as destinationsActions from '../../store/actions/destinations.actions'

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {

    public destinations$ = this.store.pipe(select(destinationsReducer.getDestinations));
    public isLoading$ = this.store.pipe(select(destinationsReducer.isLoading));

    constructor(private store: Store<any>) { }

    ngOnInit(): void {
        this.store.dispatch(destinationsActions.loadDestinations());
    }

}
