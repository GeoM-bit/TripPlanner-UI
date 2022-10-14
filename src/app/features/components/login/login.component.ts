import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import {LoginModel} from "../../../../models/loginModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/utils/customValidators";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {UserRoles} from "../../../core/enums/userRoles";
import {TokenModel} from "../../../../models/tokenModel";
import {Token} from "@angular/compiler";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel;
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private authenticationService: AuthenticationService, private snackBar: SnackBarComponent) { }

  ngOnInit(): void {
    this.initForm();
  }

  togglePasswordVisibility(element: HTMLElement) {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.loginModel = this.loginForm.value;
    this.authenticationService.login(this.loginModel).subscribe((response: TokenModel) => {
      if(response!=null) {
        this.redirectToViewBusinessTripsBasedOnRole(response);
      }
      else {
        this.openFailedLoginSnackBar();
      }
    });
  }

  redirectToViewBusinessTripsBasedOnRole(response: TokenModel){
    let role = this.authenticationService.decodeToken(response);
    if(role==UserRoles[0]) {
      //will be redirected to user page
    }
    else if(role==UserRoles[1]) {
      //will be redirected to bto page
    }
  }

  openFailedLoginSnackBar() {
    this.snackBar.openSnackBar('Failed login attempt!','');
  }

  initForm()
  {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.email, CustomValidators.WhitespaceInput]),
      'password': new FormControl(null, [Validators.required])
    });
  }

}
