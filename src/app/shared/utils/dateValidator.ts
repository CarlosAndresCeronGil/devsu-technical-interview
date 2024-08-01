import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateValidator(dateOne: string, dateTwo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const date_release = control.get(dateOne);
        const date_revision = control.get(dateTwo);

        if (!date_release || !date_revision) {
            return null;
        }

        const parse_date_release = new Date(date_release?.value);
        const parse_date_revision = new Date(date_revision?.value);
        const current_date = new Date();
        const today = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate());

        if (date_release.value < today.toISOString().split('T')[0]) {
            date_release.setErrors({ dateReleaseInvalid: true });
        }

        const one_year_later = new Date(parse_date_release);
        one_year_later.setFullYear(one_year_later.getFullYear() + 1);

        if (parse_date_revision.getFullYear() !== one_year_later.getFullYear()) {
            date_revision.setErrors({ dateRevisionInvalid: true });
        }

        return null;
    }
}