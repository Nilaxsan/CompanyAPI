import { Routes } from '@angular/router';
import { DepartmentComponent } from './component/department/department.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AdminRegistationComponent } from './component/admin-registation/admin-registation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-login',
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
  },
  {
    path:'admin-login',
    component:AdminLoginComponent
  },
  {
    path:'admin-register',
    component :AdminRegistationComponent
  }
];
