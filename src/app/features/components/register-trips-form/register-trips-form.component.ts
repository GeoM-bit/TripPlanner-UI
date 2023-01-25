import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmValidDateMatcherTrip, CustomValidators, MissingDateMatcherTrip} from "../../../core/utils/customValidators";
import {Router} from "@angular/router";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {AreaMapping, AreaType} from "../../../core/enums/areaType";
import {BusinessTripModel} from "../../../../models/businessTripModel";
import {BusinessTripService} from "../../../core/services/businessTrip.service";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'app-register-trips-form',
  templateUrl: './register-trips-form.component.html',
  styleUrls: ['./register-trips-form.component.css']
})
export class RegisterTripsFormComponent implements OnInit {
  registerTripForm: FormGroup;
  areaTypes = Object.values(AreaType).filter(value=>typeof value === 'number');
  areaMapping = AreaMapping;
  clearEndDate: Date=null;
  clearStartDate: Date=null;
  confirmValidDateMatcherTrip = new ConfirmValidDateMatcherTrip();
  missingDateMatcherTrip = new MissingDateMatcherTrip();
  businessTripModel: BusinessTripModel;
  constructor(private snackBar: SnackBarComponent, private router: Router, private tripService: BusinessTripService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerTripForm = new FormGroup({
        'area': new FormControl(null, [Validators.required]),
        'pmName': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'client': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'clientLocation': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'projectName': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'projectNumber': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(7), Validators.pattern("^[0-9]+$")]),
        'taskName': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'taskNumber': new FormControl(null, [Validators.required,Validators.minLength(4), Validators.maxLength(7), Validators.pattern("^[0-9]+$")]),
        'leavingFrom': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'phone': new FormControl(null),
        'card': new FormControl(null),
        'meanOfTransport': new FormControl(null, [Validators.required, Validators.maxLength(50),Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'accommodation': new FormControl(null, [Validators.required,Validators.maxLength(50), Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'additionalInfo': new FormControl(null, [Validators.maxLength(250)]),
        'startDate': new FormControl(null, Validators.required),
        'endDate': new FormControl(null, Validators.required)
      },
      [CustomValidators.dateValidator]
    );
  }

  onSubmit(){
    this.businessTripModel = this.registerTripForm.value;
    if(this.businessTripModel.phone==null)
      this.businessTripModel.phone=false;
    if(this.businessTripModel.card==null)
      this.businessTripModel.card=false;
    this.businessTripModel.email = this.authenticationService.getUserEmail();
    console.log(this.businessTripModel);
    this.tripService.createBusinessTrip(this.businessTripModel).subscribe((response: any) => {
      if (response == true) {
        this.redirectToViewTrips();
      }
      else {
        this.openFailedRegisterBusinessTripSnackBar();
      }
    });
  }

  CancelRequest(){
    this.router.navigate(['view-trips']);
  }

  onClearEndDate(event) {
    event.stopPropagation();
    this.clearEndDate = null;
  }

  onClearStartDate(event) {
    event.stopPropagation();
    this.clearStartDate = null;
  }

  redirectToViewTrips(){
    this.router.navigate(['view-trips']);
    this.snackBar.openSnackBar('The business trip request was successfully created!', '');
  }

  openFailedRegisterBusinessTripSnackBar() {
    this.snackBar.openSnackBar('The business trip request could not be created!','');
  }
}
