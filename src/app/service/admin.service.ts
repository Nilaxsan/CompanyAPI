import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
adminUrl = 'https://localhost:7022/api/admin/';


  constructor(private http:HttpClient) { }

  Login(data:any){
    return this.http.post<any>(this.adminUrl+'login',data);
  }
  
  Register(data:any){
    return this.http.post<any>(this.adminUrl+'register',data);
  }
}
