import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DepartmentAddEditComponent } from '../department-add-edit/department-add-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Department } from '../../model/Department';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DepartmentService } from '../../service/department.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-department',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule,RouterLink],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit, OnDestroy {
  depList: Department[] = [];

  dataSource!: MatTableDataSource<Department>;
  displayedColumns: string[] = ['DepartmentId', 'DepartmentName', 'Options'];
  subscription = new Subscription()

  constructor(private dialog: MatDialog, private service: DepartmentService) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.GetallDepartment();
  }

  GetallDepartment() {
    let sub = this.service.GetAll().subscribe((item) => {
      this.depList = item;
      console.log(this.depList);
      
      this.dataSource = new MatTableDataSource(this.depList);
    })
    this.subscription.add(sub);
  }

  addDepartment() {
    this.openpopup(0);
  }

 
  DeleteDepartment(depId:number){
      if (confirm('Are you sure you want to delete this department?')) {
        let sub = this.service.Delete(depId).subscribe((item) => {
          this.GetallDepartment();
        });
        this.subscription.add(sub);
      }
  }

  EditDepartment(depId:number){
    this.openpopup(depId);

  }

  openpopup(depId:number){
    
    this.dialog.open(DepartmentAddEditComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data:{
        'code':depId
      }
    }).afterClosed().subscribe(o=>{
      this.GetallDepartment();
    });
  }
}
