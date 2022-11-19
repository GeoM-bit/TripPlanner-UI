import {RequestStatus} from "../app/core/enums/requestStatus";

export class FilterModel {
  public clientLocation: string;
  public accommodation: string;
  public client: string;
  public status: RequestStatus;
  public startDate: Date;
  public endDate: Date;

}
