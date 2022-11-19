import { Component, OnInit } from '@angular/core';
import {UserTripModel} from "../../../../models/userTripModel";
import {Observable, of} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-view-trips-page',
  templateUrl: './view-trips-page.component.html',
  styleUrls: ['./view-trips-page.component.css']
})
export class ViewTripsPageComponent implements OnInit {
  tableElements: Observable<UserTripModel[]>;
  constructor() { }

  ngOnInit(): void {
  }

  populateTable(response: UserTripModel[]){
    this.tableElements=of(response);
  }
}
