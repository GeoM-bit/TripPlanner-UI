import {RequestStatus} from "../app/core/enums/requestStatus";
import {Guid} from "guid-typescript";

export class UpdateTripStatusModel {
  public status: RequestStatus;
  public id: Guid;
}
