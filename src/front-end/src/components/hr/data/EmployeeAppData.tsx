import { SxProps, Theme } from '@mui/system';
import { PersonalDetails, EmergencyContact } from './hiring/EmployeeDataInterfaces';

export type PersonalDetailsFieldConfig = {
  key: keyof PersonalDetails;
  label: string;
  type?: string;
};

const personalDetailsField1: PersonalDetailsFieldConfig[] = [
  { key: "firstName", label: "First Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "DOB", label: "Date of Birth" },
  { key: "SSN", label: "Social Security Number" },
];

const personalDetailsField2: PersonalDetailsFieldConfig[] = [
  { key: "lastName", label: "Last Name" },
  { key: "preferredName", label: "Preferred Name" },
  { key: "gender", label: "Gender" },
];

const addressField1: PersonalDetailsFieldConfig[] = [
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "zip", label: "Gender" },
];

const addressField2: PersonalDetailsFieldConfig[] = [
  { key: "buildingOrApt", label: "Building / Apt #" },
  { key: "state", label: "State" },
  { key: "zip", label: "Zip" },
];

const contactFields: PersonalDetailsFieldConfig[] = [
  { key: "email", label: "Email" },
  { key: "cellPhone", label: "Cell Phone" },
  { key: "workingPhone", label: "Working Phone" },
];

const employmentFields: PersonalDetailsFieldConfig[] = [
  { key: "visaType", label: "Visa Type" },
  { key: "visaStartDate", label: "Start Date" },
  { key: "visaEndDate", label: "End Date" },
];

export type EmergencyContactFieldConfig = {
  key: keyof EmergencyContact;
  label: string;
  type?: string;
};

const emergencyContact1Fields1: EmergencyContactFieldConfig[] = [
  { key: "firstName", label: "First Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "phoneName", label: "Phone" },
];

const emergencyContact1Fields2: EmergencyContactFieldConfig[] = [
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "relationship", label: "Relationship" },
];

export interface TextFieldGroupProps {
  fields: PersonalDetailsFieldConfig[] | EmergencyContactFieldConfig[];
  data: PersonalDetails | EmergencyContact;
  sx?: SxProps<Theme>;
}

export type SectionData = {
  title: string;
  fields: (PersonalDetailsFieldConfig[] | EmergencyContactFieldConfig[])[];
  data: PersonalDetails | EmergencyContact;
  sx?: SxProps<Theme>;
};

export {
  personalDetailsField1,
  personalDetailsField2,
  addressField1,
  addressField2,
  contactFields,
  employmentFields,
  emergencyContact1Fields1,
  emergencyContact1Fields2,
};
