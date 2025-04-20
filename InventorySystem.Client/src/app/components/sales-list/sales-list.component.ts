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
  imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './sales-list.component.html',
  styleUrl: './sales-list.component.scss'
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  products: Product[] = [];
  totalRecords: number = 0;
  pageNumber: number = 1;
  pageSize: number = 10;
  saleForm: FormGroup;

  constructor(
    private saleService: SaleService,
    private productService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.saleForm = this.fb.group({
      productId: [null, Validators.required],
      quantitySold: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadSales();
    this.loadProducts();
  }

  loadSales(): void {
    this.saleService.getSales().subscribe(sales => {
      this.sales = sales;
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe(response => {
      this.products = response.data;
      this.totalRecords = response.totalRecords;
    });
  }

  openSaleModal(): void {
    this.saleForm.reset();
    this.modalService.open(document.getElementById('saleModal'));
  }

  onSubmit(): void {
    if (this.saleForm.valid) {
      this.saleService.createSale(this.saleForm.value).subscribe(() => {
        this.loadSales();
        this.loadProducts(); // Refresh product quantities
        this.modalService.dismissAll();
      });
    }
  }

}
