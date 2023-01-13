import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {BusinessTripModel} from "../../../models/businessTripModel";

@Injectable({
  providedIn: 'root'
})
export class BusinessTripService {
  constructor(private http: HttpClient) {
  }

  createBusinessTrip(businessTripModel: BusinessTripModel): Observable<boolean> {
    return this.http.post<boolean>(environment.baseUrl + '/api/businesstriprequest',businessTripModel);
  }

}
