import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { DestinationsListComponent } from './components/destinations-list/destinations-list.component';
import {DestinationsRoutingModule} from "./destinations-routing.module";
import { DestinationItemComponent } from './components/destinations-list/destination-item/destination-item.component';
import {StoreModule} from "@ngrx/store";

import * as fromDestinations from './store/reducers/destinations.reducer'
import {DestinationsService} from "./services/destinations.service";
import {EffectsModule} from "@ngrx/effects";
import {DestinationsEffects} from "./store/effects/destinations.effects";

@NgModule({
  declarations: [DestinationsComponent, DestinationsListComponent, DestinationItemComponent],
  imports: [
      CommonModule,
      DestinationsRoutingModule,
      StoreModule.forFeature(fromDestinations.DESTINATIONS_REDUCER_KEY, fromDestinations.reducer),
      EffectsModule.forFeature([DestinationsEffects])
  ],
    providers: [DestinationsService]
})
export class DestinationsModule { }
