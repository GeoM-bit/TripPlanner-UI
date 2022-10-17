import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserRoles} from "../../../core/enums/userRoles";
import {FilterModel} from "../../../../models/filterModel";
import {DateAdapter} from "@angular/material/core";
import { ViewTripsService } from '../../../core/services/viewTrips.service';
import {RequestStatus, StatusMapping} from "../../../core/enums/requestStatus";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-view-filter-trips',
  templateUrl: './view-filter-trips.component.html',
  styleUrls: ['./view-filter-trips.component.css'],

})
export class ViewFilterTripsComponent implements OnInit {
  displayedColumns: string[] = ['index', 'clientName', 'location', 'projectName', 'startDate', 'endDate', 'accommodation', 'status', 'action'];
  filterForm: FormGroup;
  filterModel: FilterModel;
  role: string ="User";
  clearLocation = '';
  clearAccommodation = '';
  clearClient = '';
  statusMapping = StatusMapping;
  statusTypes = Object.values(RequestStatus).filter(value=>typeof value === 'number');

  constructor(private dateAdapter: DateAdapter<Date>, private _liveAnnouncer: LiveAnnouncer, private viewTripsService: ViewTripsService) {
    this.dateAdapter.setLocale('en-GB');
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.filterModel = this.filterForm.value;
    console.log(this.filterForm);
    console.log(this.filterModel);
    this.viewTripsService.getFilteredTripsForUser("",this.filterModel).subscribe((response: any) => {
      if (response != null)
      {
        console.log(response);
      }
    });
  }

  initForm() {
    if (this.role == UserRoles[0]) {
      this.filterForm = new FormGroup({
        'location': new FormControl(null),
        'accommodation': new FormControl(null),
        'startDate': new FormControl(null),
        'endDate': new FormControl(null),
        'client': new FormControl(null),
        'status': new FormControl(null)
      });
    } else if (this.role == UserRoles[1]) {
      this.filterForm = new FormGroup({
        'location': new FormControl(null),
        'accommodation': new FormControl(null),
        'startDate': new FormControl(null),
        'endDate': new FormControl(null),
        'client': new FormControl(null)
      });
    }
  }

  showStatusFormField()
  {
    return this.role==UserRoles[0] ? true: false;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
