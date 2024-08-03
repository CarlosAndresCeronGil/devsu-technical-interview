import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedTableComponent } from '../../shared/components/shared-table/shared-table.component';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { product } from '../../models/product';
import { pipe, tap } from 'rxjs';
import { Column } from '../../models/column';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    SharedTableComponent,
    FormsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  public listOfProducts = signal<product[]>([]);
  public loading = signal<boolean>(false);
  public productColumns = signal<Column[]>([
    { header: 'logo', field: 'logo' },
    { header: 'Nombre del producto', field: 'name' },
    { header: 'Descripción', field: 'description' },
    { header: 'Fecha liberación', field: 'date_release' },
    { header: 'Fecha de reestructuración', field: 'date_revision' },
  ]);
  public filterString = '';

  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.loading.set(true);
    this.productService.getProducts()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        pipe(
          tap(() => this.loading.set(false))
        )
      )
      .subscribe({
        next: (response) => {
          this.listOfProducts.set(response.data);
        },
        error: (err) => {
          console.log("get products error: ", err);
        }
      });
  }

  handleAddProduct(): void {
    this.router.navigate(['create-product']);
  }

}
