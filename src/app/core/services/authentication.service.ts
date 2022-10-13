import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../models/registerModel';
import { environment } from 'src/environments/environment';
import {LoginModel} from "../../../models/loginModel";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient) { }

  register(user: RegisterModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/user/register', user);
  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(environment.baseUrl + '/api/user/login', user, {responseType: 'text'});
  }

}
