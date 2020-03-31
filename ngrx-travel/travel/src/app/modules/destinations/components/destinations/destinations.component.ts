import {Component, Input, OnInit} from '@angular/core';
import {IDestination} from "../../../commons/IDestination";
import {destinationsMocks} from "../../mock/destinations.mock";

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {

    public destinations = destinationsMocks;

    constructor() { }

    ngOnInit(): void {
    }

}
