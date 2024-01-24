export interface RegDataInterface {
  employee_id: string;
  name: string;
  email: string;
  generate_token_and_send_email: boolean;
  status: string;
}

export interface HistoryRow {
  email: string;
  name: string;
  registrationLink: string;
  status: string;
}

export interface OnboardData {
  employee_id: string;
  name: string;
  email: string;
  status: string;
}
