import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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

  // LoginWithGoogle(credential:any):Observable<any>{ 
  //   const header=new HttpHeaders().set('Content-Type','application/json');
  //   return this.http.post<any>(this.adminUrl+'loginWithGoogle',JSON.stringify(credential),{headers:header});
  // }

  LoginWithGoogle(credential: string): Observable<any> {
    const body = { credential: credential };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this.adminUrl + 'loginWithGoogle', body, { headers: headers });
  }
  
}
