import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {UserTripModel} from "../../../models/userTripModel";
import {FilterModel} from "../../../models/filterModel";
import {BtoTripModel} from "../../../models/btoTripModel";

@Injectable({
  providedIn: 'root'
})
export class ViewTripsService {
  constructor(private http: HttpClient) {
  }

  getFilteredTripsForUser(searchCriteria: FilterModel): Observable<any> {
    return this.http.post<UserTripModel[]>(environment.baseUrl + '/api/viewbusinesstrips/viewtrips',searchCriteria);
  }

  getFilteredTripsForBTO(searchCriteria: FilterModel): Observable<any> {
    return this.http.post<BtoTripModel[]>(environment.baseUrl + '/api/viewbusinesstrips/viewtrips',searchCriteria);
  }
}
