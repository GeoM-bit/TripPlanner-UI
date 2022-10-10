import { FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomValidators {

  static MatchValidator(source: FormGroup) {
      const control1 = source.controls['password'];
      const control2 = source.controls['confirmationPassword'];
      return control1 && control2 && control1.value !== control2.value
        ? { 'mismatch': true }
        : null;
  }

  static WhitespaceInput(control: FormControl) {
    const isWhitespaceInput = (control.value || '').trim().length === 0;
    const isValid = !isWhitespaceInput;
    return isValid ? null : { 'whitespace': true };
  }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.parent.errors?.mismatch || control.errors?.required) && control.touched;
  }
}

