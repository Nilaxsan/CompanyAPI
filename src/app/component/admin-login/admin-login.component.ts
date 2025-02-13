import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminLogin } from '../../model/Admin';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardActions,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  title = 'Login';
  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  OnSubmit() {
    if (this.loginForm.valid) {
      let _data: AdminLogin = {
        email: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      };
      this.service.Login(_data).subscribe(
        (item) => {
          localStorage.setItem('token', item.token);
          console.log(item);

          this.toastr.success('Login Successfull');

          this.router.navigateByUrl('/employee');
        },
        (err) => {
          this.toastr.error('Login Failed');
        }
      );
    }
  }
}
