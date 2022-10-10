import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../../models/registerModel';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(private http: HttpClient) { }

  register(user: RegisterModel): Observable<any> {
    return this.http.post('https://localhost:7209/api/User/Register', user);
  }
 
}
