export interface EmployeeDataInterface {
  employee_id: string;
  name: string;
  work_auth: string;
  start_day: string;
  end_day: string;
  remaining: number;
  next_step: string;
}

export interface FileData {
  name: string;
  modifiedDate: string;
  status: string;
  canDownload: boolean;
  canPreview: boolean;
  documentUrl: string;
}
