import {Component, Input, OnInit} from '@angular/core';
import {IDestination} from "../../../../commons/IDestination";

@Component({
  selector: 'app-destination-item',
  templateUrl: './destination-item.component.html',
  styleUrls: ['./destination-item.component.scss']
})
export class DestinationItemComponent implements OnInit {

    @Input() destination: IDestination;

    constructor() { }

    ngOnInit(): void {
    }

}
