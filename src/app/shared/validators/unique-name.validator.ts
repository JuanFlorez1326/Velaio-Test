import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueFullNameValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const peopleArray = (formArray as FormArray).controls;
      const names = peopleArray.map((control: any) => control.get('fullName')?.value?.toLowerCase());
  
      const hasDuplicates = names.some((name: any, index: any) => names.indexOf(name) !== index);
  
      return hasDuplicates ? { nonUniqueFullNames: true } : null;
    };
}  