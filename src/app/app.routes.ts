import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        component: ProductListComponent
    },
    {
        path: 'create-product',
        loadComponent: () => import('./components/create-product/create-product.component')
            .then((c) => c.CreateProductComponent)
    }
];
