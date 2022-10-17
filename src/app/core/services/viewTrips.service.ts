import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {FilterModel} from "../../../models/filterModel";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ViewTripsService {
  constructor(private http: HttpClient) {
  }

  getFilteredTripsForUser(email:string, filterModel: FilterModel): Observable<any> {
    return this.http.get(environment.baseUrl + 'api/userviewbusinesstrips/tripsforuser');
  }
}
