import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
@Component({
  selector: 'app-employee',
  imports: [MatCardModule,MatButtonModule,MatDialogModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(private dialog:MatDialog) { }

  addemployee() {
      this.dialog.open(AddEmployeeComponent,{
        width:'50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms'
      });
  }

}
