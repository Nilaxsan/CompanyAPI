import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-registation',
 imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardActions,
    CommonModule,
    RouterModule
  ],
    templateUrl: './admin-registation.component.html',
  styleUrl: './admin-registation.component.css',
})
export class AdminRegistationComponent implements OnInit {
  constructor(private service: AdminService,private toastr:ToastrService,private route:Router) {}

  title = 'Registation';


  registationForm = new FormGroup({
    adminId: new FormControl(0),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onRegister() {
    if(this.registationForm.valid) {
      let _data = {
        adminId: this.registationForm.value.adminId as number,
        userName: this.registationForm.value.userName as string,
        email: this.registationForm.value.email as string,
        password: this.registationForm.value.password as string,
        role: this.registationForm.value.role as string,
      };
      this.service.Register(_data).subscribe((item) => {
          this.toastr.success('Registation Successfull');
          //reset form without error
          this.registationForm.reset();
          this.route.navigateByUrl('/admin-login');



       
      });
  }
}
}
