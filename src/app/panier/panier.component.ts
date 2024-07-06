import {Component, OnInit} from '@angular/core';
import {CartService} from '../core/services/cart.service';
import {Product} from '../core/models/Product';
import {ProductService} from '../core/services/product.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from "../core/auth/auth.service";

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cart: any;
  products: any[] = [];
  totalAmount: number = 0;
  availableProducts: Product[] = [];
  user: any;
  userId: string

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.user = this.authService.getUserFromStorage()
    this.userId = this.user._id
    this.fetchCart()
  }

  private fetchCart(): void {
    this.cartService.fetchCart(this.userId).subscribe(data => {
      console.log(data)
      this.cart = data;
      this.products = data.produits;
    });
  }

  increaseQuantity(product: any) {
    this.cartService.addToCart(product.produitId._id, this.userId, 1).subscribe(
      () => this.fetchCart()
    );
  }

  decreaseQuantity(product: any) {
    this.cartService.addToCart(product.produitId._id, this.userId, -1).subscribe(
      () => this.fetchCart()
    );
  }

  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product.produitId._id, this.userId, product.quantity).subscribe(() => {
      this.fetchCart()
    });
  }

  updateQuantity(productId: string, quantity: number): void {
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

    this.cartService.updateQuantity(productId, quantity).subscribe(
      () => {
      },
      error => {
        console.error('Error updating quantity:', error);
        this.fetchCart();
      }
    );
  }

  validateOrder(): void {
    if(!this.userId){
      this.router.navigate(["/sign-in"])
    }
    if (this.products.length > 0) {
      this.cartService.validateCart(this.userId).subscribe(() => {
        this.cart = [];
      });

      Swal.fire({
        title: 'Order Validated!',
        text: 'Your order has been successfully validated.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.router.navigate(['/product']).then(r => window.location.reload())
      })
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
        this.cartService.clearCart(this.userId).subscribe(() => {
          this.cart = [];
          Swal.fire(
            'Cleared!',
            'Your cart has been cleared.',
            'success'
          );
          this.router.navigate(['/product']);
        });
      }
    })
  }
}
