import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  @Input() productForm!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() modalClose = new EventEmitter<void>();

  onSubmit() {
    if (this.productForm.valid) {
      this.formSubmit.emit();
    }
  }

  onClose() {
    this.modalClose.emit();
  }
}
