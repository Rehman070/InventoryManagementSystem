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

  constructor(
    private purchaseService: PurchaseService,
  ) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  loadPurchases(): void {
    this.purchaseService.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
    });
  }

}
