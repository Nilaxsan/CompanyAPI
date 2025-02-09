import { Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department.component';
import { EmployeeComponent } from './component/employee/employee.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee',
    //redirectTo: ()=>{}
    pathMatch: 'full'
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  }
];
