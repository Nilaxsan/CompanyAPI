import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = 'https://localhost:7022/api/Employee';
  photoUrl='https://localhost:7022/api/Employee/upload';

  constructor(private http: HttpClient) {}  

  GetAll() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  Get(employeeId: string) {
    return this.http.get<Employee>(this.apiUrl+'/'+employeeId);
  }

  Create(data :Employee) {
    return this.http.post<Employee>(this.apiUrl,data);
  }

  Update(data :Employee) {
    return this.http.put<Employee>(this.apiUrl+'/'+data.employeeId,data);
  }

  Delete(EmployeeId : number) {
    return this.http.delete<Employee>(this.apiUrl+'/'+EmployeeId);
  }

  UploadPhoto(EmployeeId : number ,data :FormData) {
    return this.http.post<any>(this.photoUrl+'/'+EmployeeId,data);
  }
  

}
