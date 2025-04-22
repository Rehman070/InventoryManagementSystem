import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product.model';
import { Sale } from '../../models/sale.model';
import { ProductService } from '../../services/product.service';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-list',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss'
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  products: Product[] = [];

  constructor(
    private saleService: SaleService,
  ) {
  }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getSales().subscribe(sales => {
      this.sales = sales;
    });
  }
}
