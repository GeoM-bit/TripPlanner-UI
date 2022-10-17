export enum RequestStatus{
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Cancelled = 3
}

export const StatusMapping: Record<RequestStatus, string> = {
  [RequestStatus.Pending]:"Pending",
  [RequestStatus.Accepted]:"Accepted",
  [RequestStatus.Rejected]:"Rejected",
  [RequestStatus.Cancelled]:"Cancelled",
}
