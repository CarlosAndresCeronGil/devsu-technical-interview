import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getProductsResponse } from '../models/getProductsResponse';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { postProductResponse } from '../models/postProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<getProductsResponse> {
    return this.http.get<getProductsResponse>('http://localhost:3002/bp/products')
  }

  createProduct(data: product): Observable<postProductResponse> {
    return this.http.post<postProductResponse>('http://localhost:3002/bp/products', data)
  }

}
