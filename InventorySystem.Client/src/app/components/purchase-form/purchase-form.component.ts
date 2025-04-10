import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-purchase-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  @Input() product!: Product;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() modalClose = new EventEmitter<void>();

  purchaseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.purchaseForm = this.fb.group({
      quantityPurchased: [1, [Validators.required, Validators.min(1)]],
      supplier: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.purchaseForm.valid) {
      this.formSubmit.emit(this.purchaseForm.value);
    }
  }

  onClose() {
    this.modalClose.emit();
  }
}
