import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department, DepartmentAdd } from '../model/Department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiUrl = 'https://localhost:7022/api/Department';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    let token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  GetAll() {
    return this.http.get<Department[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  Get(departmentId: number) {
    return this.http.get<DepartmentAdd>(this.apiUrl + '/' + departmentId, {
      headers: this.getAuthHeaders(),
    });
  }

  Create(data: DepartmentAdd) {
    return this.http.post<DepartmentAdd>(this.apiUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }

  Update(data: DepartmentAdd) {
    return this.http.put<DepartmentAdd>(
      this.apiUrl + '/' + data.departmentId,
      data,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  Delete(DepartmentId: number) {
    return this.http.delete<Department>(this.apiUrl + '/' + DepartmentId, {
      headers: this.getAuthHeaders(),
    });
  }
}
