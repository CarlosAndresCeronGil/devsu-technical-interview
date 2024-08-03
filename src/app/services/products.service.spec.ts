import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { product } from '../models/product';
import { getProductsResponse } from '../models/getProductsResponse';
import { FormBuilder } from '@angular/forms';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    productService = new ProductsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  it('Should return expected products (HttpClient called once)', (done: DoneFn) => {
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

    productService.getProducts().subscribe({
      next: (products) => {
        expect(products).withContext('expected products').toEqual(expectedProducts);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });

  it('should create a product (httpClient called once)', (done: DoneFn) => {
    const testProductToCreate = {
      "date_release": "2024-08-03",
      "date_revision": "2025-02-13",
      "description": "Descripcion 1",
      "id": "uno",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "name": "Nombre 1"
    };

    const postResponse = {
      message: 'Product created successfully',
      data: testProductToCreate
    }

    httpClientSpy.post.and.returnValue(of(postResponse));

    productService.createProduct(testProductToCreate).subscribe({
      next: (response) => {
        expect(response).withContext('expected post response').toEqual(postResponse);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  })
});
