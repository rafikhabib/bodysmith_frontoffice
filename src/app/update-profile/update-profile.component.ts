// src/app/update-profile/update-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../core/auth/user.service';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../core/auth/user.types';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  user: any = null;
  updateProfileForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.updateProfileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      nickName: [''],
      email: [''],
      birthDate: [''],
      adresse: [''],
      phoneNumber: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
        this.updateProfileForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          nickName: this.user.nickName,
          email: this.user.email,
          birthDate: this.user.birthDate,
          adresse: this.user.adresse,
          phoneNumber: this.user.phoneNumber,
        });
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.updateProfileForm.valid) {
      const updatedUser = this.updateProfileForm.value;
      this.userService.updateUserInfo(updatedUser).subscribe(
        (data: User) => {
          this.user = data;
          alert('Profile updated successfully!');
        },
        (error) => {
          console.error('Error updating profile', error);
        }
      );
    }
  }
}
