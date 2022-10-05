import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  static WhitespaceInput(control: FormControl) {
    const isWhitespaceInput = (control.value || '').trim().length === 0;
    const isValid = !isWhitespaceInput;
    return isValid ? null : { 'whitespace': true };
  }
}
