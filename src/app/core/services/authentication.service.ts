import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../models/registerModel';
import { environment } from 'src/environments/environment';
import {LoginModel} from "../../../models/loginModel";
import {TokenModel} from "../../../models/tokenModel";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient) { }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/user/register', user);
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post<TokenModel>(environment.baseUrl + '/api/user/login', user);
  }

  logout():Observable<any>{
    return this.http.post<any>(environment.baseUrl + '/api/user/logout',null);
  }

  getUserRole()
  {
    let token = localStorage.getItem('token');
    if(token!=null) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      return decodedJwtData.role;
    }
    return null;
  }

  getUserEmail() : string
  {
    let token = localStorage.getItem('token');
    if(token!=null) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);

      return decodedJwtData.name;
    }
    return null;
  }

}
