import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department, DepartmentAdd } from '../model/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

   apiUrl = 'https://localhost:7022/api/Department';
  
    constructor(private http: HttpClient) {}  
  
    GetAll() {
      return this.http.get<Department[]>(this.apiUrl);
    }
  
    Get(departmentId: number) {
      return this.http.get<DepartmentAdd>(this.apiUrl+'/'+departmentId);
    }
  
    Create(data :DepartmentAdd) {
      return this.http.post<DepartmentAdd>(this.apiUrl,data);
    }
  
    Update(data :DepartmentAdd) {
      return this.http.put<DepartmentAdd>(this.apiUrl+'/'+data.departmentId,data);
    }
  
    Delete(DepartmentId : number) {
      return this.http.delete<Department>(this.apiUrl+'/'+DepartmentId);
    }
  
    
  
  }
  