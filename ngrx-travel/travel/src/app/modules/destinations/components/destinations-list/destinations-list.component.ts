import {Component, Input, OnInit} from '@angular/core';
import {IDestination} from "../../../commons/IDestination";

@Component({
  selector: 'app-destinations-list',
  templateUrl: './destinations-list.component.html',
  styleUrls: ['./destinations-list.component.scss']
})
export class DestinationsListComponent implements OnInit {

    @Input() destinations: IDestination[];

    constructor() { }

    ngOnInit(): void {
    }

}
