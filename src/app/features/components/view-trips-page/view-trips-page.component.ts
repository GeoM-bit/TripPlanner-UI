import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserTripModel} from "../../../../models/userTripModel";
import {Observable, of, Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {GetTripsModel} from "../../../../models/getTripsModel";

@Component({
  selector: 'app-view-trips-page',
  templateUrl: './view-trips-page.component.html',
  styleUrls: ['./view-trips-page.component.css']
})
export class ViewTripsPageComponent implements OnInit {
  filterElements: GetTripsModel;
  constructor() { }

  ngOnInit(): void {
  }

  populateTable(response: GetTripsModel){
    this.filterElements = new GetTripsModel();
    this.filterElements = response;
    console.log(response);
  }
}
