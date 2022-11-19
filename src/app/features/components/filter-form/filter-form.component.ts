import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FilterModel} from "../../../../models/filterModel";
import {RequestStatus, StatusMapping} from "../../../core/enums/requestStatus";
import {ConfirmValidDateMatcher, CustomValidators, MissingDateMatcher} from "../../../core/utils/customValidators";
import {DateAdapter} from "@angular/material/core";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ViewTripsService} from "../../../core/services/viewTrips.service";
import {UserRoles} from "../../../core/enums/userRoles";
import {GetTripsModel} from "../../../../models/getTripsModel";
import {UserTripModel} from "../../../../models/userTripModel";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  filterForm: FormGroup;
  filterModel: FilterModel;
  clearLocation = '';
  clearAccommodation = '';
  clearClient = '';
  statusMapping = StatusMapping;
  clearEndDate: Date=null;
  clearStartDate: Date=null;
  getTripsModel = new GetTripsModel();
  statusTypes = Object.values(RequestStatus).filter(value=>typeof value === 'number');
  confirmValidDateMatcher = new ConfirmValidDateMatcher();
  missingDateMatcher = new MissingDateMatcher();

  @Output()
  filter = new EventEmitter<UserTripModel[]>();

  constructor(private dateAdapter: DateAdapter<Date>, private _liveAnnouncer: LiveAnnouncer, private viewTripsService: ViewTripsService, private authenticationService: AuthenticationService) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.initForm();
    this.getTripsModel.email = this.viewTripsService.getEmail();
    this.viewTripsService.getFilteredTripsForUser(this.getTripsModel).subscribe((response: UserTripModel[]) => {
      if (response != null)
      {
        this.filterComplete(response);
      }
    });
  }

  onSubmit() {
    this.filterModel = this.filterForm.value;
    this.checkForWhiteSpaces();
    this.getTripsModel.email = this.viewTripsService.getEmail();
    this.getTripsModel.searchCriteria = this.filterModel;

    this.viewTripsService.getFilteredTripsForUser(this.getTripsModel).subscribe((response: UserTripModel[]) => {
      if (response != null)
      {
        this.filterComplete(response);
      }
    });
  }

  onReset(){
    this.getTripsModel.searchCriteria = null;
    this.viewTripsService.getFilteredTripsForUser(this.getTripsModel).subscribe((response: UserTripModel[]) => {
      if (response != null)
      {
        this.filterComplete(response);
      }
    });
  }

  initForm() {
    if (this.authenticationService.getUserRole() == UserRoles[0]) {
      this.filterForm = new FormGroup({
          'clientLocation': new FormControl(null, Validators.pattern("^[a-zA-Z ]*$")),
          'accommodation': new FormControl(null, Validators.pattern("^[a-zA-Z ]*$")),
          'startDate': new FormControl(null),
          'endDate': new FormControl(null),
          'client': new FormControl(null, Validators.pattern("^[a-zA-Z ]*$")),
          'status': new FormControl(null)
        },
        [CustomValidators.dateValidator]);
    } else if (this.authenticationService.getUserRole() == UserRoles[1]) {
      this.filterForm = new FormGroup({
          'clientLocation': new FormControl(null),
          'accommodation': new FormControl(null),
          'startDate': new FormControl(null),
          'endDate': new FormControl(null),
          'client': new FormControl(null)
        },
        [CustomValidators.dateValidator]);
    }
  }

  showStatusFormField()
  {
    return this.authenticationService.getUserRole()==UserRoles[0] ? true: false;
  }

  onClearEndDate(event) {
    event.stopPropagation();
    this.clearEndDate = null;
  }

  onClearStartDate(event) {
    event.stopPropagation();
    this.clearStartDate = null;
  }

  filterComplete(response: UserTripModel[]) {
    this.filter.emit(response);
  }

  checkForWhiteSpaces()
  {
    if(this.filterModel.accommodation == "")
    {
      this.filterModel.accommodation = null;
    }
    else if(this.filterModel.accommodation !=null)
    {
      this.filterModel.accommodation = this.filterModel.accommodation.trim();
    }

    if(this.filterModel.client == "")
    {
      this.filterModel.client = null;
    }
    else if(this.filterModel.client !=null)
    {
      this.filterModel.client = this.filterModel.client.trim();
    }

    if(this.filterModel.clientLocation == "")
    {
      this.filterModel.clientLocation = null;
    }
    else if(this.filterModel.clientLocation !=null)
    {
      this.filterModel.clientLocation = this.filterModel.clientLocation.trim();
    }
  }
}
