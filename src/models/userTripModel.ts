import {Guid} from "guid-typescript";
import {RequestStatus} from "../app/core/enums/requestStatus";

export class UserTripModel{
  public id: Guid;
  public clientLocation: String;
  public accommodation: String;
  public client: String;
  public projectName: String;
  public startDate: Date;
  public endDate: Date;
  public status: RequestStatus;
}
