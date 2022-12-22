export enum ApplicationTypes {
  LEASE_REGISTRATION = "LEASE_REGISTRATION",
  CERT_TITLE_DEED_PLOT = "CERT_TITLE_DEED_PLOT",
  ADD_POA = "ADD_POA",
  ADD_COMPANY_EMPLOYEE = "ADD_COMPANY_EMPLOYEE"
}

export enum ActionTypes {
  DARI_REFRESH_TOKEN = "DARI_REFRESH_TOKEN",
  ADD_EMPLOYEE = "ADD_EMPLOYEE",
  SUBMIT_APPLICATION = "SUBMIT_APPLICATION",
  INITIATE_APPLICATION = "INITIATE_APPLICATION",
}

export type Log = {
  logId: number,
  applicationId: number | null,
  applicationType: ApplicationTypes | null,
  companyId: number | null,
  actionType: ActionTypes,
  ip: string | null,
  userAgent: string | null,
  userId: number | null,
  source: string | null, // TODO: clarify enum
  ownerId: number | null,
  logInfo: string | null,
  creationTimestamp: string,
}

export type LoggerListResult = {
  totalPages: number,
  number: number,
  recordsTotal: number,
  recordsFiltered: number,
  auditLog: Log[],
}

export type LoggerListResponse = {
  success: boolean,
  elapsed: number,
  result: LoggerListResult,
};