import {
  AbstractControl, ValidationErrors
} from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  if (typeof value === 'string') {
    value = value.trim();
  }
  return value == null || value.length === 0;
}

export class CValidators {
  static required(errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmptyInputValue(control.value)
        ? { errorMessage, required: true }
        : null;
    };
  }
}