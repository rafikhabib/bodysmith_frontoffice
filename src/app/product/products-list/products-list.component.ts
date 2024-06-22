import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @ViewChild('popupNotification', { static: false }) popupNotification!: ElementRef;
  @ViewChild('outOfStockNotification', { static: false }) outOfStockNotification!: ElementRef;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  categoryName: string = '';
  productAddedToCart: number | null = null;
  errorMessage: string | null = null;

  cart: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCart();
  }

  validateCategory(): boolean {
    const regex = /^[a-zA-Z0-9\s]*$/;
    return regex.test(this.categoryName);
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.applyFilters(); // Apply filters once products are loaded
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  applyFilters(): void {
    if (!this.validateCategory()) {
      this.errorMessage = "Category name cannot contain special characters.";
      return;
    } else {
      this.errorMessage = null;
    }

    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = !this.categoryName || product.categoryName === this.categoryName;
      const matchesPriceRange = (!this.minPrice || product.price >= this.minPrice) &&
                                 (!this.maxPrice || product.price <= this.maxPrice);
      return matchesCategory && matchesPriceRange;
    });
  }

  resetFilters(): void {
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.categoryName = '';
    this.getProducts();
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
        this.applyFilters();
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }

  buyProduct(product: Product): void {
    if (product.quantity > 0) {
      product.quantity -= 1;
  
      this.productService.updateProduct(product.id, product).subscribe(
        (updatedProduct) => {
          console.log('Product updated:', updatedProduct);
  
          // Ajoutez le produit au panier après une mise à jour réussie
          this.cartService.addToCart(updatedProduct).subscribe(() => {
            // Afficher la notification appropriée
            if (updatedProduct.quantity === 0) {
              this.showOutOfStockNotification();
            } else {
              this.showPopupNotification();
            }
  
            // Actualisez le panier pour refléter l'ajout du produit
            this.getCart();
  
            // Réinitialise productAddedToCart après 5 secondes
            setTimeout(() => {
              this.productAddedToCart = null;
            }, 5000);
          });
        },
        (error) => {
          console.error('Error updating product:', error);
  
          // Revert to the previous quantity if the update fails
          product.quantity += 1;
        }
      );
  
    } else {
      console.warn('Product quantity is already 0');
      // Afficher une notification de rupture de stock si nécessaire
      this.showOutOfStockNotification();
    }
  }
  

  getCart(): void {
    this.cartService.cart$.subscribe(
      (data) => {
        this.cart = data; // Update the local cart with the received data
      },
      (error) => {
        console.error('Error fetching cart', error);
      }
    );
  }

  showPopupNotification(): void {
    console.log('showPopupNotification called');
    const popup = this.popupNotification.nativeElement;
    popup.classList.add('show');
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }

  showOutOfStockNotification(): void {
    console.log('showOutOfStockNotification called');
    const popup = this.outOfStockNotification.nativeElement;
    popup.classList.add('show');
    setTimeout(() => {
      popup.classList.remove('show');
    }, 3000);
  }

  validateAndAdjustPrices(): void {
    if (this.minPrice !== undefined && this.minPrice < 0) {
      this.minPrice = 0;
    }
    if (this.maxPrice !== undefined && this.maxPrice < 0) {
      this.maxPrice = 0;
    }
    this.applyFilters();
  }
}
