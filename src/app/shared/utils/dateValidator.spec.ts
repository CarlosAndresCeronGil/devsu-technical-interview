import { FormControl, FormGroup } from '@angular/forms';
import { dateValidator } from './dateValidator';

describe('dateValidator', () => {

  it('should return null if dates are invalid', () => {
    const formGroup = new FormGroup({
      date_release: new FormControl(undefined),
      date_revision: new FormControl(undefined)
    });

    const validatorFn = dateValidator('date_release', 'date_revision');
    const result = validatorFn(formGroup);
    expect(result).toBeNull();
  });

  it('should set dateReleaseInvalid error if release date is in the past', () => {
    const formGroup = new FormGroup({
      date_release: new FormControl('2023-01-01'),
      date_revision: new FormControl('2025-08-01')
    });

    const validatorFn = dateValidator('date_release', 'date_revision');
    validatorFn(formGroup);
    expect(formGroup.get('date_release')?.errors).toEqual({ dateReleaseInvalid: true });
  });

  it('should set dateRevisionInvalid error if revision date is not one year after release date', () => {
    const formGroup = new FormGroup({
      date_release: new FormControl('2024-08-01'),
      date_revision: new FormControl('2026-07-31')
    });

    const validatorFn = dateValidator('date_release', 'date_revision');
    validatorFn(formGroup);
    expect(formGroup.get('date_revision')?.errors).toEqual({ dateRevisionInvalid: true });
  });

  it('should return null if form controls do not exist', () => {
    const formGroup = new FormGroup({});

    const validatorFn = dateValidator('date_release', 'date_revision');
    const result = validatorFn(formGroup);
    expect(result).toBeNull();
  });
});
