import { FormGroup } from "@angular/forms";

export default function checkFormErrors(formGroup: FormGroup) {
    return (controlReference: string, showNamingReference: string) => {
        if(formGroup!.get(controlReference)?.errors!['required']) {
            return `${showNamingReference} es requerido`;
        }
        if(formGroup!.get(controlReference)?.errors!['minlength']) {
            return `${showNamingReference} debe tener al menos
            ${formGroup!.get(controlReference)?.errors!['minlength'].requiredLength}
            caracteres`;
        }
        if(formGroup!.get(controlReference)?.errors!['maxlength']) {
            return `${showNamingReference} debe tener maximo
            ${formGroup!.get(controlReference)?.errors!['maxlength'].requiredLength}
            caracteres`;
        }
        if(formGroup!.get(controlReference)?.errors!['dateReleaseInvalid']) {
            return `${showNamingReference} debe ser mayor o igual a la fecha actual`;
        }
        if(formGroup!.get(controlReference)?.errors!['dateRevisionInvalid']) {
            return `${showNamingReference} debe ser un año posterior a fecha de liberación`;
        }
        return 'Error';
    }
}