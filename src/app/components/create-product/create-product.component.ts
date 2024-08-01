import { Component, inject, OnDestroy, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import checkFormErrors from '../../shared/utils/checkFormErrors';
import { dateValidator } from '../../shared/utils/dateValidator';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnDestroy{

  public productForm: FormGroup | undefined;
  public errorMessage: any;
  public showMessage = signal<boolean>(false);
  public loading = signal<boolean>(false);

  private destroyed = new Subject();

  private productService = inject(ProductsService);
  private fb = inject(FormBuilder);

  constructor() {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', Validators.required],
      date_revision: ['', Validators.required]
    },
      {
        validators: dateValidator('date_release', 'date_revision')
      }
    );

    this.errorMessage = checkFormErrors(this.productForm);

  }

  handleSubmit(): void {
    if (this.productForm?.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    console.log("this.productForm?.value: ", this.productForm?.value)
    this.productService.createProduct(this.productForm?.value)
      .pipe(
        takeUntil(this.destroyed),
        tap(() => {
          this.loading.set(false);
          this.showSuccesfulMessage();
        })
      )
      .subscribe({
        next: (response) => {
          console.log("product created response: ", response);
          this.productForm?.reset();
        },
        error: (err) => {
          console.log("product creation error: ", err);
        }
      })
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  showSuccesfulMessage() {
    this.showMessage.set(true)
    setTimeout(() => {
      this.showMessage.set(false);
    }, 3000);
  }

  resetForm(): void {
    this.productForm?.reset();
  }

  get id(): AbstractControl<any> {
    return this.productForm!.controls['id'];
  }

  get name(): AbstractControl<any> {
    return this.productForm!.controls['name'];
  }

  get description(): AbstractControl<any> {
    return this.productForm!.controls['description'];
  }

  get logo(): AbstractControl<any> {
    return this.productForm!.controls['logo'];
  }

  get date_release(): AbstractControl<any> {
    return this.productForm!.controls['date_release'];
  }

  get date_revision(): AbstractControl<any> {
    return this.productForm!.controls['date_revision'];
  }

}
