import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterModel } from '../../../../models/registerModel';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ConfirmValidParentMatcher, CustomValidators } from '../../../core/utils/customValidators';
import { SnackBarRegisterComponent } from '../snack-bar-register/snack-bar-register.component';
import { Router } from '@angular/router';
import { Constants } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  registerModel: RegisterModel;
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmationPassword = true;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private authenticationService: AuthenticationService, private snackBar: SnackBarRegisterComponent, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
      'lastName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), CustomValidators.WhitespaceInput]),
      'email': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z]+\\.[a-zA-Z]+@nagarro.com$")]),
      'password': new FormControl(null, [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#=+';:_,.?!@$%^&*-]).{10,}$")]),
      'confirmationPassword': new FormControl(null, [Validators.required])
    },
      [CustomValidators.PasswordMatchValidator]);

  }

  togglePasswordVisibility(element: HTMLElement) {
    if(element.getAttribute('formControlName') == Constants.passwordControlName)
      this.hidePassword = !this.hidePassword;
    else if(element.getAttribute('formControlName') == Constants.confirmationPasswordControlName)
      this.hideConfirmationPassword = !this.hideConfirmationPassword;
  }

  onSubmit() {
    this.registerModel = this.registerForm.value;
    this.authenticationService.register(this.registerModel).subscribe((response: any) => {
      if (response == true)
      {
        this.redirectToLogin();
      }
      else
        this.openFailedRegisterSnackBar();
    });
  }

  redirectToLogin(){
    this.router.navigate(['login']);
    this.snackBar.openSnackBar('Your account was successfully created!', '');
  }

  openFailedRegisterSnackBar() {
      this.snackBar.openSnackBar('Your account could not be created!','');
  }

}
