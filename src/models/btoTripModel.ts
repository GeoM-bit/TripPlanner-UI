import {Guid} from "guid-typescript";
import {AreaType} from "../app/core/enums/areaType";

export class BtoTripModel{
  public id: Guid;
  public firstName: String;
  public lastName: String;
  public email: String;
  public projectName: String;
  public pmName: String;
  public client: String;
  public clientLocation: String;
  public area: AreaType;
  public startDate: Date;
  public endDate: Date;
  public accommodation: String;

}
