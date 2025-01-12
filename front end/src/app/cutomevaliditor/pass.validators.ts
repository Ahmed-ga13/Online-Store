import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class passwordValidators {
  static passwoedstrength(): ValidatorFn {
    return (contorl: AbstractControl): ValidationErrors | null => {
      const value = contorl.value;
      if (!value) {
        return null;
      } 
        const hasNumber = /[0-9]/.test(value);
        const hasCapitalLetter = /[A-Z]/.test(value);
        const hasSmallLetter = /[a-z]/.test(value);
        // const hasSpecialCharacter = /[^A-Za-z0-9]/.test(value);
        const isValidLength = value.length > 7
        //  && value.length < 21;
        const passwordValid = hasNumber && hasCapitalLetter && hasSmallLetter &&
        //  hasSpecialCharacter &&
          isValidLength;
        return passwordValid ? null : { passwordstrength: true };

    };
  }
}
