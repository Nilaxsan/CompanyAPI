import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardActions } from '@angular/material/card';
import { DepartmentAdd } from '../../model/Department';
import { EmployeeService } from '../../service/employee.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../service/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-add-edit',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatCardActions,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl:'./department-add-edit.component.html',
  styleUrl: './department-add-edit.component.css',
})
export class DepartmentAddEditComponent implements OnInit {


  title = 'Add Department';
  dialogdata: any;
  isEdit = false;
  constructor(
    private service: DepartmentService,
    private ref: MatDialogRef<DepartmentAddEditComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
      this.dialogdata = this.data;
      if(this.dialogdata.code> 0){
        this.title = 'Edit Department';
        this.isEdit = true;
        this.service.Get(this.dialogdata.code).subscribe(item=>{
          let _data = item;
          if(_data!=null){
            this.depForm.setValue({
              departmentName:_data.departmentName,
              departmentId:_data.departmentId
              
            })
          }
        })
          

      }
  }
 
  depForm = new FormGroup({
    departmentId: new FormControl(0),
    departmentName: new FormControl('', Validators.required),
    
  });

  SaveDepartment() {
    if (this.depForm.valid) {
      let _data: DepartmentAdd = {
        departmentId: this.depForm.value.departmentId as number,

        departmentName: this.depForm.value.departmentName as string,
        
      };
      if (this.isEdit){
        this.service.Update(_data).subscribe((item) => {
          this.toastr.success('Department Updated Successfully','Updated');
          this.closepopup();
        });
      }
      else{
        this.service.Create(_data).subscribe((item) => {
          this.toastr.success('Department Added Successfully','Created');
          this.closepopup();
        });

      }
      
    }
  }
  closepopup() {
    this.ref.close();
  }
}
