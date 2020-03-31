import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { DestinationsListComponent } from './components/destinations-list/destinations-list.component';
import {DestinationsRoutingModule} from "./destinations-routing.module";
import { DestinationItemComponent } from './components/destinations-list/destination-item/destination-item.component';



@NgModule({
  declarations: [DestinationsComponent, DestinationsListComponent, DestinationItemComponent],
  imports: [
      CommonModule,
      DestinationsRoutingModule
  ]
})
export class DestinationsModule { }
