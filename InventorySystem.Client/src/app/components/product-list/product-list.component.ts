import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { PurchaseFormComponent } from '../purchase-form/purchase-form.component';
import { PurchaseService } from '../../services/purchase.service';
import { SaleService } from '../../services/sale.service';
import { SaleFormComponent } from '../sale-form/sale-form.component';
import { ExcelService } from '../../services/excel.service';
@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, CommonModule, ProductFormComponent, PurchaseFormComponent, SaleFormComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  productForm: FormGroup;
  isEditMode = false;
  currentProductId: number | null = null;

  constructor(
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private excelService: ExcelService,
    private saleService: SaleService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.productForm.reset();
    const modalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.productForm = this.productForm;
    modalRef.componentInstance.isEditMode = this.isEditMode;

    modalRef.componentInstance.formSubmit.subscribe(() => {
      this.onSubmit();
      modalRef.close();
    });

    modalRef.componentInstance.modalClose.subscribe(() => {
      modalRef.close();
    });
  }

  openEditModal(product: Product): void {
    console.log('Editing product:', product);
    console.log('Product ID:', product.id);
    this.isEditMode = true;
    this.currentProductId = product.id;
    this.productForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity
    });

    const modalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.productForm = this.productForm;
    modalRef.componentInstance.isEditMode = this.isEditMode;

    modalRef.componentInstance.formSubmit.subscribe(() => {
      this.onSubmit();
      modalRef.close();
    });

    modalRef.componentInstance.modalClose.subscribe(() => {
      modalRef.close();
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;

      // Ensure we have the ID for updates
      if (this.isEditMode && this.currentProductId) {
        productData.id = this.currentProductId;

        this.productService.updateProduct(this.currentProductId, productData).subscribe({
          next: () => {
            this.loadProducts();
            this.modalService.dismissAll();
          },
          error: (err) => {
            console.error('Update failed:', err);
            alert('Update failed. Please check console for details.');
          }
        });
      } else {
        this.productService.createProduct(productData).subscribe({
          next: () => {
            this.loadProducts();
            this.modalService.dismissAll();
          },
          error: (err) => {
            console.error('Create failed:', err);
            alert('Create failed. Please check console for details.');
          }
        });
      }
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  openPurchaseModal(product: Product): void {
    const modalRef = this.modalService.open(PurchaseFormComponent);
    modalRef.componentInstance.product = product;

    modalRef.componentInstance.formSubmit.subscribe((purchaseData: any) => {
      const purchasePayload = {
        productId: product.id,
        quantityPurchased: purchaseData.quantityPurchased,
        supplier: purchaseData.supplier
      };

      this.purchaseService.createPurchase(purchasePayload).subscribe({
        next: () => {
          this.loadProducts();
          modalRef.close();
          alert('Product purchase successfully!');
        },
        error: (err) => {
          console.error('Purchase failed:', err);
          alert('Purchase recording failed');
        }
      });
    });

    modalRef.componentInstance.modalClose.subscribe(() => {
      modalRef.close();
    });
  }
  // Add to your ProductListComponent
  openSaleModal(product: Product): void {
    const modalRef = this.modalService.open(SaleFormComponent);
    modalRef.componentInstance.product = product;
    modalRef.componentInstance.availableQuantity = product.quantity;

    modalRef.componentInstance.formSubmit.subscribe((saleData: any) => {
      const salePayload = {
        productId: product.id,
        quantitySold: saleData.quantitySold
      };

      this.saleService.createSale(salePayload).subscribe({
        next: () => {
          this.loadProducts(); // Refresh product quantities
          modalRef.close();
          alert('Product sold successfully!');
        },
        error: (err) => {
          console.error('Sale failed:', err);
          alert('Sale recording failed');
        }
      });
    });

    modalRef.componentInstance.modalClose.subscribe(() => {
      modalRef.close();
    });
  }

  exportProducts(): void {
    this.excelService.exportProducts().subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Products.xlsx';
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Export failed:', err);
      }
    });
  }

}
