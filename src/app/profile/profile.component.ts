import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/auth/user.service';
import { User } from '../core/auth/user.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }
  navigateToUpdateProfile(): void {
    this.router.navigate(['/update-profile']);
  }
  navigateToChangePassword(): void {
    this.router.navigate(['/change-password']);
  }
}
