import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule,MatDialog} from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-employee',
  imports: [MatCardModule,MatButtonModule,MatDialogModule,MatTableModule,CommonModule],
    providers: [provideNativeDateAdapter()],

  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',

})
export class EmployeeComponent implements OnInit, OnDestroy {


empList:Employee[]=[];
dataSource!:MatTableDataSource<Employee>;
displayedColumns: string[] = ['EmployeeId', 'EmployeeName', 'DepartmentName', 'DateOfJoining', 'PhotoFileName', 'Options'];
subscription=new Subscription();


  constructor(private dialog:MatDialog, private service :EmployeeService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.GetallEmployee();
  
  }

  GetallEmployee(){
    let sub=this.service.GetAll().subscribe((item)=>{
      this.empList=item;
      console.log(this.empList);
      this.dataSource=new MatTableDataSource(this.empList);
    })
    this.subscription.add(sub);
  }

  addemployee() {
    this.openpopup(0);
  }

  DeleteEmployee(empId:number){
    if(confirm('Are you sure you want to delete this employee?')){
      let sub=this.service.Delete(empId).subscribe((item)=>{
        this.GetallEmployee();
      });
      this.subscription.add(sub);
    }
  }

  EditEmployee(empId:number){
    this.openpopup(empId);
  }

  openpopup(empId:number){
    this.dialog.open(AddEmployeeComponent,{
      width:'50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        'code':empId
      }
    }).afterClosed().subscribe(o=>{
      this.GetallEmployee();
    });
  }

}
