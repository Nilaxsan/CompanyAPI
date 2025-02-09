import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../service/department.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
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
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  title = 'Add Employee';
  dialogdata: any;
  isEdit = false;
  departments: any = [];

  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dialogdata = this.data;
    if (this.dialogdata.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;
      this.service.Get(this.dialogdata.code).subscribe((item) => {
        const _data = item;
        if (_data != null) {
          this.empForm.setValue({
            employeeId: _data.employeeId,
            employeeName: _data.employeeName,
            departmentName: _data.departmentName,
            dateOfJoining: new Date(_data.dateOfJoining),
            photoFileName: _data.photoFileName,
          });
        }
      });
    }
    this.departmentService.GetAll().subscribe((item: any) => {
      this.departments = item;
    });
  }

  empForm = new FormGroup({
    employeeId: new FormControl(0),
    employeeName: new FormControl('', Validators.required),
    departmentName: new FormControl('', Validators.required),
    dateOfJoining: new FormControl(new Date(), Validators.required),
    photoFileName: new FormControl('', Validators.required),
  });

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
  SaveEmployee() {
    if (this.empForm.valid) {
      let _data: Employee = {
        employeeId: this.empForm.value.employeeId as number,
        employeeName: this.empForm.value.employeeName as string,
        departmentName: this.empForm.value.departmentName as string,
        dateOfJoining: (this.empForm.value.dateOfJoining as Date).toISOString(),
        photoFileName: this.empForm.value.photoFileName as string,
      };
      if (this.isEdit) {
        this.service.Update(_data).subscribe((item) => {
          this.toastr.success('Employee Updated Successfully', 'Updated');
          this.closepopup();
        });
      } else {
        this.service.Create(_data).subscribe((item) => {
          this.toastr.success('Employee Added Successfully', 'Created');
          this.closepopup();
        });
      }
    }
  }

  closepopup() {
    this.ref.close();
  }
}
