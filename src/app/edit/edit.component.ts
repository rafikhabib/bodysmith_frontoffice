import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/Product';
import { ProductService } from '../core/services/product.service';
import { CategorieService } from '../core/services/categorie.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    title: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      this.noSpecialCharactersValidator()
    ]),
    description: new FormControl("", [
      this.noSpecialCharactersValidator()
    ]),
    price: new FormControl("", [
      Validators.required,
      Validators.min(0.01)
    ]),
    idCategorie: new FormControl("", Validators.required),
    quantity: new FormControl("", [
      Validators.required,
      Validators.min(1)
    ]),
    image: new FormControl('', [Validators.required]),
  });

  noSpecialCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const regex = /^[a-zA-Z0-9\u00C0-\u00FF ]*$/;
      const isValid = regex.test(control.value);
      return isValid ? null : { specialCharacters: true };
    };
  }

  products: any[] = [];
  selectedProduct: Product | null = null;
  categories : any[] | undefined;

  constructor(private productService: ProductService, private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe(
      data=> this.categories = data,
      error=>console.log(error)
    )

    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        console.log(products);
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  updateProduct(product: any): void {
    // Vérifier la longueur minimale du titre et de la description
    if (product.title.length < 6) {
      console.error('Title must be at least 6 characters long');
      return;
    }

    if (product.description.length < 10) {
      console.error('Description must be at least 10 characters long');
      return;
    }

    const productId = product._id;
    console.log(product)

    this.productService.updateProduct(productId, product).subscribe(
      (updatedProduct) => {
        console.log('Product updated successfully', updatedProduct);
        // Handle updating local product list or UI as needed
      },
      (error) => {
        console.error('Error updating product', error);
        // Handle error as needed
      }
    );
  }

  deleteProduct(productId: string): void {
    Swal.fire({
      title: 'Delete Product',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            console.log('Product deleted successfully');
            // Mettre à jour la liste locale des produits ou l'interface utilisateur si nécessaire
            this.fetchProducts(); // Recharger la liste des produits après la suppression
          },
          (error) => {
            console.error('Error deleting product', error);
            // Gérer l'erreur selon les besoins
          }
        );
      }
    });
  }
  isValidTitle(title: string): boolean {
    return /^[A-Za-z ]*$/.test(title);
  }

  isValidDescription(description: string): boolean {
    // Allow only alphanumeric and basic punctuation characters
    return /^[a-zA-Z0-9 ,.!?()-]*$/.test(description);
  }

  onDescriptionKeydown(event: KeyboardEvent): void {
    // Prevent certain special characters from being entered in description field
    const forbiddenChars = /[!@#$%^&*_=+[{\]};:'"<>/\\|~`]/;
    if (forbiddenChars.test(event.key)) {
      event.preventDefault();
    }
  }
  
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.productForm.get('image')!.setValue(`/assets/images/${file.name}`);
    }
  }
}
