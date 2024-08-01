import { Component, inject, OnInit } from '@angular/core';
import { SharedTableComponent } from '../../shared/components/shared-table/shared-table.component';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  private router = inject(Router);
  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe({
        next: (response) => {
          console.log("get products response: ", response);
        },
        error: (err) => {
          console.log("get products error: ", err);
        }
      })
  }

  handleAddProduct(): void {
    this.router.navigate(['create-product']);
  }

}
