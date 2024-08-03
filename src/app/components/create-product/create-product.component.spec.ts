import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ProductsService } from '../../services/products.service';
import { of } from 'rxjs';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let productService: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    await TestBed.configureTestingModule({
      imports: [CreateProductComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        HttpHandler
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = new ProductsService(httpClientSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the form', () => {
    const productElement: HTMLElement = fixture.nativeElement;
    const form = productElement.getElementsByTagName('form');

    expect(form).withContext('selected the form element').toBeTruthy();
  });

  it('should display error messages when form is invalid', () => {
    component.handleSubmit();
    expect(component.productForm?.touched).toBeTruthy();
  });

  it('should call createProduct on valid form submission', () => {
    const product = {
      "id": "uno",
      "name": "Nombre 1",
      "description": "Descripcion 1",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "date_release": "2024-08-03",
      "date_revision": "2025-06-19"
    }

    component.productForm?.setValue(product);
    expect(component.productForm?.valid).toBeTruthy();

    httpClientSpy.post.and.returnValue(of({ success: true }));

    component.handleSubmit();

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });
});
