import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product.model';
import { Purchase } from '../../models/purchase.model';
import { ProductService } from '../../services/product.service';
import { PurchaseService } from '../../services/purchase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchases-list',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './purchases-list.component.html',
  styleUrl: './purchases-list.component.scss'
})
export class PurchasesListComponent implements OnInit {
  purchases: Purchase[] = [];
  products: Product[] = [];
  purchaseForm: FormGroup;

  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.purchaseForm = this.fb.group({
      productId: [null, Validators.required],
      quantityPurchased: [1, [Validators.required, Validators.min(1)]],
      supplier: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPurchases();
    this.loadProducts();
  }

  loadPurchases(): void {
    this.purchaseService.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openPurchaseModal(): void {
    this.purchaseForm.reset();
    this.modalService.open(document.getElementById('purchaseModal'));
  }

  onSubmit(): void {
    if (this.purchaseForm.valid) {
      this.purchaseService.createPurchase(this.purchaseForm.value).subscribe(() => {
        this.loadPurchases();
        this.loadProducts(); // Refresh product quantities
        this.modalService.dismissAll();
      });
    }
  }
}
