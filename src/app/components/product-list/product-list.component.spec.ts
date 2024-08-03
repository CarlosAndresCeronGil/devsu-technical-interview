import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { getProductsResponse } from '../../models/getProductsResponse';
import { of } from 'rxjs';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get', 'post']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productService = new ProductsService(httpClientSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts when component initialize', () => {
    const expectedProducts: getProductsResponse = {
      "data": [
        {
          "id": "uno",
          "name": "Nombre 1",
          "description": "Descripcion 1",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "date_release": "2024-08-03",
          "date_revision": "2025-02-13"
        },
        {
          "id": "dos",
          "name": "Nombre 2",
          "description": "Descripcion 1",
          "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
          "date_release": "2024-08-08",
          "date_revision": "2025-07-17"
        },
      ]
    }

    httpClientSpy.get.and.returnValue(of(expectedProducts));

    component.ngOnInit();

    expect(httpClientSpy.get.calls.count()).withContext('should be called once').toBe(1);
    expect(component.loading()).toBeFalse();
  });
});
