import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { PurchasesListComponent } from './components/purchases-list/purchases-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'sales', component: SalesListComponent },
  { path: 'purchases', component: PurchasesListComponent }
];
