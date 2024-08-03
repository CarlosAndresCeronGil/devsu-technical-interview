import { FormControl, FormGroup } from '@angular/forms';
import checkFormErrors from './checkFormErrors';

describe('checkFormErrors', () => {
  let formGroup: FormGroup;

  beforeEach(() => {
    formGroup = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      date_release: new FormControl(''),
      date_revision: new FormControl('')
    });
  });

  it('should return "Nombre es requerido" message if control is required', () => {
    formGroup.get('name')?.setErrors({ required: true });

    const result = checkFormErrors(formGroup)('name', 'Nombre');
    expect(result).toBe('Nombre es requerido');
  });

  // TODO
  it('should return "minlength" message if control does not meet minlength requirement', () => {
    formGroup.get('name')?.setErrors({ minlength: { requiredLength: 5 } });

    const result = checkFormErrors(formGroup)('name', 'Nombre');
    expect(result).toBe('Nombre debe tener al menos 5 caracteres');
  });

  it('should return "maxlength" message if control exceeds maxlength requirement', () => {
    formGroup.get('name')?.setErrors({ maxlength: { requiredLength: 10 } });

    const result = checkFormErrors(formGroup)('name', 'Nombre');
    expect(result).toBe('Nombre debe tener maximo 10 caracteres');
  });

  it('should return "dateReleaseInvalid" message if date is invalid', () => {
    formGroup.get('date_release')?.setErrors({ dateReleaseInvalid: true });

    const result = checkFormErrors(formGroup)('date_release', 'Fecha de liberación');
    expect(result).toBe('Fecha de liberación debe ser mayor o igual a la fecha actual');
  });

  it('should return "dateRevisionInvalid" message if revision date is invalid', () => {
    formGroup.get('date_revision')?.setErrors({ dateRevisionInvalid: true });

    const result = checkFormErrors(formGroup)('date_revision', 'Fecha de revisión');
    expect(result).toBe('Fecha de revisión debe ser un año posterior a fecha de liberación');
  });

  it('should return "Error" if no specific error is found', () => {
    formGroup.get('name')?.setErrors({ customError: true });

    const result = checkFormErrors(formGroup)('name', 'Nombre');
    expect(result).toBe('Error');
  });
});
