import { SxProps, Theme } from '@mui/system';

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


export interface EmergencyContact {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneName: string;
  email: string;
  relationship: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  DOB: string;
  gender: string;
  SSN: string;
  street: string;
  buildingOrApt: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  cellPhone: string;
  workingPhone: string;
  visaType: string;
  visaStartDate: string;
  visaEndDate: string;
};

export interface FileTableEntry {
  name: string;
  modifiedTime: string; 
  size: string;
};