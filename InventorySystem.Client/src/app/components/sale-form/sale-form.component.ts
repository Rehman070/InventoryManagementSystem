import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent {
  @Input() product!: any;
  @Input() availableQuantity!: number;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() modalClose = new EventEmitter<void>();

  saleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.saleForm = this.fb.group({
      quantitySold: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.saleForm.get('quantitySold')?.addValidators([
      Validators.max(this.availableQuantity)
    ]);
  }

  onSubmit() {
    if (this.saleForm.valid) {
      this.formSubmit.emit(this.saleForm.value);
    }
  }

  onClose() {
    this.modalClose.emit();
  }
}
