import {AreaType} from "../app/core/enums/areaType";

export class BusinessTripModel {
  public email: String;
  public area: AreaType;
  public pmName: String;
  public client: String;
  public projectName: String;
  public projectNumber: String;
  public taskName: String;
  public taskNumber: String;
  public clientLocation: String;
  public leavingFrom: String;
  public phone: boolean;
  public card: boolean;
  public meanOfTransport: String;
  public accommodation: String;
  public additionalInfo: String;
  public startDate: Date;
  public endDate: Date;
}
