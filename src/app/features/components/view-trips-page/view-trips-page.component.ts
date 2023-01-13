import {Component,OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {FilterModel} from "../../../../models/filterModel";

@Component({
  selector: 'app-view-trips-page',
  templateUrl: './view-trips-page.component.html',
  styleUrls: ['./view-trips-page.component.css']
})
export class ViewTripsPageComponent implements OnInit {
  filterElements= new FilterModel();
  dataSubject: Subject<FilterModel> = new Subject();
  constructor() { }

  ngOnInit(): void {
  }

  populateTable(response: FilterModel){
    this.filterElements = response;
    this.dataSubject.next(this.filterElements);
  }
}
