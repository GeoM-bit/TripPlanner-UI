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

  login(user: LoginModel): Observable<TokenModel> {
    let response = this.http.post<TokenModel>(environment.baseUrl + '/api/user/login', user);
      response.subscribe((response: TokenModel) => {
        if(response!=null) {
          localStorage.setItem('token', JSON.stringify({token: response.token}));
        }
      });
      return response;
  }

   getRole(): string
  {
    let token = localStorage.getItem('token');
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.role;
  }

}
