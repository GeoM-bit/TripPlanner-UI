import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmValidDateMatcher, CustomValidators, MissingDateMatcher} from "../../../core/utils/customValidators";
import {Router} from "@angular/router";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {AreaMapping, AreaType} from "../../../core/enums/areaType";

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
  confirmValidDateMatcher = new ConfirmValidDateMatcher();
  missingDateMatcher = new MissingDateMatcher();

  constructor(private snackBar: SnackBarComponent, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.registerTripForm = new FormGroup({
        'area': new FormControl(null, [Validators.required]),
        'pmName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'client': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'clientLocation': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'projectName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'projectNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$")]),
        'taskName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'taskNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$")]),
        'departureLocation': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'phone': new FormControl(null),
        'card': new FormControl(null),
        'meansOfTransport': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'accommodation': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
        'additionalInfo': new FormControl(null),
        'startDate': new FormControl(null, Validators.required),
        'endDate': new FormControl(null, Validators.required)
      }
    );
  }

  onSubmit(){

  }

  onClearEndDate(event) {
    event.stopPropagation();
    this.clearEndDate = null;
  }

  onClearStartDate(event) {
    event.stopPropagation();
    this.clearStartDate = null;
  }
}
