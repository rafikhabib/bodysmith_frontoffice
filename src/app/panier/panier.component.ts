import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Product } from '../core/models/Product';
import Swal from 'sweetalert2';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cart: Product[] = [];
  totalAmount: number = 0;
  availableProducts: Product[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchCart();
    this.productService.getProducts().subscribe(products => {
      this.availableProducts = products;
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.fetchCart();
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    const cartProduct = this.cart.find(product => product.id === productId);
    if (!cartProduct) {
      return;
    }

    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const availableProduct = this.availableProducts.find(p => p.id === productId);
    if (availableProduct && quantity > availableProduct.quantity) {
      Swal.fire({
        title: 'Maximum Quantity Reached',
        text: `You can't add more than ${availableProduct.quantity} of this product.`,
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    cartProduct.quantity = quantity;
    this.calculateTotalAmount();

    this.cartService.updateQuantity(productId, quantity).subscribe(
      () => {},
      error => {
        console.error('Error updating quantity:', error);
        this.fetchCart();
      }
    );
  }

  addToCart(productId: number): void {
    const productToAdd = this.availableProducts.find(product => product.id === productId);
    if (productToAdd) {
      const cartProduct = this.cart.find(p => p.id === productId);
      const currentQuantityInCart = cartProduct ? cartProduct.quantity : 0;

      if (currentQuantityInCart >= productToAdd.quantity) {
        Swal.fire({
          title: 'Maximum Quantity Reached',
          text: `You have reached the maximum available quantity (${productToAdd.quantity}) for this product.`,
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }

      this.cartService.addToCart(productToAdd).subscribe(() => {
        productToAdd.quantity -= 1;
        this.fetchCart();
      });
    } else {
      Swal.fire({
        title: 'Out of Stock',
        text: 'Sorry, this product is out of stock.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  validateOrder(): void {
    if (this.cart.length > 0) {
      Swal.fire({
        title: 'Order Validated!',
        text: 'Your order has been successfully validated.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartService.clearCart().subscribe(() => {
            this.cart = [];
            this.calculateTotalAmount();
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add products to the cart before validating the order.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  clearAllCart(): void {
    Swal.fire({
      title: 'Clear Cart',
      text: 'Are you sure you want to clear the entire cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe(() => {
          this.cart = [];
          this.calculateTotalAmount();
          Swal.fire(
            'Cleared!',
            'Your cart has been cleared.',
            'success'
          );
        });
      }
    });
  }

  private calculateTotalAmount(): void {
    this.totalAmount = this.cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  private fetchCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.calculateTotalAmount();
    });
  }
}
