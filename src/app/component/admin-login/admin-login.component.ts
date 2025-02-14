import { Component, NgZone, OnInit } from '@angular/core';
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
import {CredentialResponse,PromptMomentNotification} from 'google-one-tap';
import {MatDividerModule} from '@angular/material/divider';


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
    MatDividerModule,
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private service: AdminService,
    private toastr: ToastrService,
    private router: Router,
    private _ngZone : NgZone
  ) {}

  title = 'Login';
  ngOnInit(): void {
      //@ts-ignore
    window.onGoogleLibraryLoad = () => {
      //@ts-ignore
       google.accounts.id  .initialize({
        client_id: '1026346412066-3pfllm7m2j3f92rnk6frmsmng74bootn.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside:true,

      });
      //@ts-ignore
      google.accounts.id.renderButton(
      //@ts-ignore

        document.getElementById('buttonDiv'),
        {theme: 'outline', size: 'large', width: "100%" ,text: 'login with google'}
      );
    };

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
  goRegister() {
    this.router.navigateByUrl('/admin-register');
  } 

  // async handleCredentialResponse(response: CredentialResponse) {
  //   await this.service.LoginWithGoogle(response.credential).subscribe(
  //     (x: any)=>{
  //       localStorage.setItem("token",x.token);
  //       this.toastr.success('Login Successfull');
  //       this._ngZone.run(()=>
  //         this.router.navigateByUrl('/employee')

  //       )
  //     },
  //     (err: any)=>{
  //       console.error(err);
  //       this.toastr.error('Login Failed');
  //     }
  //   );
  // }

  async handleCredentialResponse(response: CredentialResponse) {
    // Decode the Google credential payload to extract email
    

    await this.service.LoginWithGoogle(response.credential).subscribe(
        (x: any) => {
            localStorage.setItem('token', x.token);
            this.toastr.success('Login Successful');
            this._ngZone.run(() => this.router.navigateByUrl('/employee'));
        },
        (err: any) => {
            console.error(err);
            this.toastr.error('Login Failed');
        }
    );
}




}
