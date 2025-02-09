// import { Component } from '@angular/core';
// import {
//   FormControl,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatSelectModule } from '@angular/material/select';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import { MatIconModule } from '@angular/material/icon';
// import { MatCardActions } from '@angular/material/card';
// import { EmployeeAdd } from '../../model/Employee';
// import { EmployeeService } from '../../service/employee.service';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-add-employee',
//   imports: [
//     MatCardModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatButtonModule,
//     MatInputModule,
//     MatDatepickerModule,
//     MatSelectModule,
//     MatIconModule,
//     MatCardActions,
//   ],
//   providers: [provideNativeDateAdapter()],
//   templateUrl: './add-employee.component.html',
//   styleUrl: './add-employee.component.css',
// })
// export class AddEmployeeComponent {

//   constructor(private service: EmployeeService, private ref:MatDialogRef<AddEmployeeComponent>) {

//   }
//   title = 'Add Employee';
//   empForm = new FormGroup({
//     EmployeeName: new FormControl('', Validators.required),
//     Department: new FormControl('', Validators.required),
//     DateOfJoining: new FormControl(new Date(), Validators.required),
//     PhotoFileName: new FormControl('', Validators.required),
//   });

//   SaveEmployee() {
//     if (this.empForm.valid) {
//         let _data:EmployeeAdd={
//           EmployeeName:this.empForm.value.EmployeeName as string,
//           Department:this.empForm.value.Department as string,
//           DateOfJoining: (this.empForm.value.DateOfJoining as Date).toISOString(),
//           PhotoFileName: this.empForm.value.PhotoFileName as string
//         }
//         this.service.Create(_data).subscribe(item=>{
//           alert('Employee Added Successfully');
//           this.closepopup();
//         })
//     }
//   }
//   closepopup(){
//     this.ref.close();

//   }

// }

import { Component } from '@angular/core';
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
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../service/employee.service';

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
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  constructor(
    private service: EmployeeService,
    private ref: MatDialogRef<AddEmployeeComponent>
  ) {}

  title = 'Add Employee';
  empForm = new FormGroup({
    EmployeeId: new FormControl(0),
    EmployeeName: new FormControl('', Validators.required),
    Department: new FormControl('', Validators.required),
    DateOfJoining: new FormControl(new Date(), Validators.required),
    PhotoFileName: new FormControl('', Validators.required),
  });

  selectedFile: any = null;

onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;

}
  SaveEmployee() {    
    if (this.empForm.value) {
      if (this.selectedFile) {
        const formData = new FormData();
        console.log('Selected file:', this.selectedFile);
        
        formData.append('uploadedFile', this.selectedFile, this.selectedFile.name);
        this.service.UploadPhoto(this.empForm.value.EmployeeId as number, formData).subscribe(
          (PhotoFileName) => {
            this.createEmployee(PhotoFileName);
            console.log('Photo uploaded:', PhotoFileName);
            
          },
          (error) => {
            console.error('Photo upload failed:', error);
            alert('Photo upload failed');
          }
        );
      } else {
        this.createEmployee('');
      }
    }
  }


  private createEmployee(photoFileName: string) {
    const employeeData: Employee = {
      EmployeeId: this.empForm.value.EmployeeId as number,
      EmployeeName: this.empForm.value.EmployeeName as string,
      Department: this.empForm.value.Department as string,
      DateOfJoining: (this.empForm.value.DateOfJoining as Date).toISOString(),
      PhotoFileName: this.selectedFile ? photoFileName : '',
    };

    this.service.Create(employeeData).subscribe(
      () => {
        alert('Employee Added Successfully');
        this.closepopup();
      },
      (error) => {
        console.error('Employee creation failed:', error);
        alert('Employee creation failed');
      }
    );
  }

  closepopup() {
    this.ref.close();
  }
}
