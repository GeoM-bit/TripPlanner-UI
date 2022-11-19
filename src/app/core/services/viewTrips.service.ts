import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {UserTripModel} from "../../../models/userTripModel";
import {GetTripsModel} from "../../../models/getTripsModel";

@Injectable({
  providedIn: 'root'
})
export class ViewTripsService {
  constructor(private http: HttpClient) {
  }

  getFilteredTripsForUser(getTripsModel: GetTripsModel): Observable<any> {
    return this.http.post<UserTripModel[]>(environment.baseUrl + '/api/userviewbusinesstrips/tripsforuser',getTripsModel);
  }

  getEmail()
  {
    let token = localStorage.getItem('token');
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.name;
  }
}
