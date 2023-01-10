import {RequestStatus} from "./requestStatus";

export enum AreaType {
  Web=0,
  Automotive=1,
  Qa=2,
  MachineLearning=3,
  DevOps=4,
  Gaming=5,
  Project=6,
  Hr=7
}

export const AreaMapping: Record<AreaType, string> = {
  [AreaType.Web]:"Web",
  [AreaType.Automotive]:"Automotive",
  [AreaType.Qa]:"Qa",
  [AreaType.MachineLearning]:"MachineLearning",
  [AreaType.DevOps]:"DevOps",
  [AreaType.Gaming]:"Gaming",
  [AreaType.Project]:"Project",
  [AreaType.Hr]:"Hr"
}
