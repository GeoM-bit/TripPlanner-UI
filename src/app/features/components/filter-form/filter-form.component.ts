import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FilterModel} from "../../../../models/filterModel";
import {RequestStatus, StatusMapping} from "../../../core/enums/requestStatus";
import {ConfirmValidDateMatcher, CustomValidators, MissingDateMatcher} from "../../../core/utils/customValidators";
import {DateAdapter} from "@angular/material/core";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ViewTripsService} from "../../../core/services/viewTrips.service";
import {UserRoles} from "../../../core/enums/userRoles";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css']
})
export class FilterFormComponent implements OnInit {
  filterForm: FormGroup;
  clearLocation = '';
  clearAccommodation = '';
  clearClient = '';
  statusMapping = StatusMapping;
  clearEndDate: Date=null;
  clearStartDate: Date=null;
  searchCriteria = new FilterModel();
  statusTypes = Object.values(RequestStatus).filter(value=>typeof value === 'number');
  confirmValidDateMatcher = new ConfirmValidDateMatcher();
  missingDateMatcher = new MissingDateMatcher();

  @Output()
  filter = new EventEmitter<FilterModel>();

  constructor(private dateAdapter: DateAdapter<Date>, private _liveAnnouncer: LiveAnnouncer, private viewTripsService: ViewTripsService, private authenticationService: AuthenticationService) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.initForm();
    this.filterComplete(this.searchCriteria);
  }

  onSubmit() {
    this.searchCriteria = this.filterForm.value;
    this.checkForWhiteSpaces();
    this.filterComplete(this.searchCriteria);
  }

  onReset(){
    this.filterComplete(new FilterModel());
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

  filterComplete(response: FilterModel) {
    this.filter.emit(response);
  }

  checkForWhiteSpaces()
  {
    if(this.searchCriteria.accommodation == "")
    {
      this.searchCriteria.accommodation = null;
    }
    else if(this.searchCriteria.accommodation !=null)
    {
      this.searchCriteria.accommodation = this.searchCriteria.accommodation.trim();
    }

    if(this.searchCriteria.client == "")
    {
      this.searchCriteria.client = null;
    }
    else if(this.searchCriteria.client !=null)
    {
      this.searchCriteria.client = this.searchCriteria.client.trim();
    }

    if(this.searchCriteria.clientLocation == "")
    {
      this.searchCriteria.clientLocation = null;
    }
    else if(this.searchCriteria.clientLocation !=null)
    {
      this.searchCriteria.clientLocation = this.searchCriteria.clientLocation.trim();
    }
  }
}
