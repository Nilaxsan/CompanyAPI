// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Employee } from '../model/Employee';

// @Injectable({
//   providedIn: 'root',
// })
// export class EmployeeService {
//   apiUrl = 'https://localhost:7022/api/Employee';
//   photoUrl='https://localhost:7022/api/Employee/upload/';

//   constructor(private http: HttpClient) {}

//   GetAll() {
//     return this.http.get<Employee[]>(this.apiUrl);
//   }

//   Get(employeeId: string) {
//     return this.http.get<Employee>(this.apiUrl+'/'+employeeId);
//   }

//   Create(data :Employee) {
//     return this.http.post<Employee>(this.apiUrl,data);
//   }

//   Update(data :Employee) {
//     return this.http.put<Employee>(this.apiUrl+'/'+data.employeeId,data);
//   }

//   Delete(EmployeeId : number) {
//     return this.http.delete<Employee>(this.apiUrl+'/'+EmployeeId);
//   }

//   // UploadPhoto(EmployeeId : number ,data :FormData) {
//   //   return this.http.post<any>(this.photoUrl+'/'+EmployeeId,data);
//   // }
//   UploadPhoto(employeeId: number, formData: FormData) {
//     return this.http.post<{ message: string; filePath: string }>(
//       this.photoUrl+ employeeId,
//       formData
//     );
//   }

// }
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl = 'https://localhost:7022/api/Employee';
  photoUrl = 'https://localhost:7022/api/Employee/upload/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    let token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  GetAll() {
    return this.http.get<Employee[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  Get(employeeId: string) {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  Create(data: Employee) {
    return this.http.post<Employee>(this.apiUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }

  Update(data: Employee) {
    return this.http.put<Employee>(`${this.apiUrl}/${data.employeeId}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  Delete(employeeId: number) {
    return this.http.delete<Employee>(`${this.apiUrl}/${employeeId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  UploadPhoto(employeeId: number, formData: FormData) {
    return this.http.post<{ message: string; filePath: string }>(
      `${this.photoUrl}${employeeId}`,
      formData,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
