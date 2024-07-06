import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.currentUser.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/sign-in']);
  }
  navigateToProfile(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }


}
