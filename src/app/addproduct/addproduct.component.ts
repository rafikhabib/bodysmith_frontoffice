// src/app/addproduct/addproduct.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  productForm: FormGroup = new FormGroup({
    title: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      this.noSpecialCharactersValidator()
    ]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      this.noSpecialCharactersValidator()
    ]),
    price: new FormControl("", [
      Validators.required,
      Validators.min(0.01)
    ]),
    categoryName: new FormControl("", Validators.required),
    quantity: new FormControl("", [
      Validators.required,
      Validators.min(1)
    ]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  maxFileSize = 5 * 1024 * 1024;
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {}

  addProduct() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (newProduct) => {
          console.log('Product added successfully:', newProduct);
          this.productForm.reset();
          // Navigate or perform further actions
        },
        error: (err) => {
          console.error('Error adding product:', err);
        }
      });
    } else {
      this.markFormGroupTouched(this.productForm);
    }
  }

  noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z0-9\u00C0-\u00FF ]*$/;
      const isValid = regex.test(control.value);
      return isValid ? null : { specialCharacters: true };
    };
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        alert(`File size exceeds limit (Max: ${this.maxFileSize / (1024 * 1024)} MB)!`);
        this.productForm.get('imageUrl')!.setValue('');
        return;
      }
      if (!this.allowedFileTypes.includes(file.type)) {
        alert(`Invalid file type. Allowed types: ${this.allowedFileTypes.join(', ')}.`);
        this.productForm.get('imageUrl')!.setValue('');
        return;
      }
      this.productForm.get('imageUrl')!.setValue(`/assets/images/${file.name}`);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  navigateToEdit(): void {
    this.router.navigateByUrl('/edit'); // Navigue vers /edit
  }
}
