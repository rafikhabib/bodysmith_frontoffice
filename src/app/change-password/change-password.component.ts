// src/app/change-password/change-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/auth/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentpassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordconfirm: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { currentpassword, password, passwordconfirm } =
        this.changePasswordForm.value;

      if (password !== passwordconfirm) {
        alert('New password and confirm password do not match');
        return;
      }

      this.userService
        .changePassword(currentpassword, password, passwordconfirm)
        .subscribe(
          () => {
            alert('Password changed successfully!');
            this.changePasswordForm.reset();
          },
          (error: any) => {
            console.error('Error changing password', error);
            alert('Error changing password');
          }
        );
    }
  }
}
