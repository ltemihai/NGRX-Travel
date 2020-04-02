import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as destinationsReducer from '../../store/index'
import * as destinationsActions from '../../store/actions/destinations.actions'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IDestination } from '../../../commons/IDestination';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit, OnDestroy {

    public destinations$ = this.store.pipe(select(destinationsReducer.getDestinations), filter(data => !!data));
    public isLoading$ = this.store.pipe(select(destinationsReducer.isLoading));
    public isDestinationAdding$ = this.store.pipe(select(destinationsReducer.isDestinationAdding));

    countryForm: FormGroup;

    isDestinationAddedSubscription: Subscription;

    constructor(private store: Store<any>,
                private toastr: ToastrService,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.store.dispatch(destinationsActions.loadDestinations());
        this.countryForm = this.formBuilder.group({
            name: ['', Validators.required],
            flag: ['', Validators.required]
        });
        this.isDestinationAddedSubscription = this.store.pipe(
            select(destinationsReducer.isDestinationAdded),
            filter(isAdded => isAdded === true))
            .subscribe(() => {
                this.countryForm.reset({
                    name: '',
                    flag: ''
                });
                this.toastr.success('You have added your next destination', 'Congratz!');
                this.store.dispatch(destinationsActions.loadDestinations());
            });
    }

    submit(): void {
        this.store.dispatch(destinationsActions.addDestination({
            data: {
                id: Math.random() * 1000,
                name: this.countryForm.controls.name.value,
                flag: this.countryForm.controls.flag.value
            } as IDestination
        }));
    }

    ngOnDestroy(): void {
        if (this.isDestinationAddedSubscription) {
            this.isDestinationAddedSubscription.unsubscribe();
        }
    }

}
