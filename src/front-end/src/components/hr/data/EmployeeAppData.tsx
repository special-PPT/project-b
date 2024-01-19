import { SxProps, Theme } from '@mui/system';

const employeeData = {
  personalDetails: {
    firstName: "John",
    lastName: "Doe",
    middleName: "Yash",
    preferredName: "",
    DOB: "2000-01-09",
    gender: "Male",
    SSN: "000000",
    street: "112 Second",
    buildingOrApt: "1222",
    city: "Pleasanton",
    state: "CA",
    zip: "666666",
    email: "example@example.com",
    cellPhone: "122-222-2221",
    workingPhone: "669-999-6666",
    visaType: "OPT",
    visaStartDate: "2023-01-09",
    visaEndDate: "2024-01-08",
  },
  emergencyContacts: [
    {
      firstName: "John",
      lastName: "Doe",
      middleName: "Doe",
      phoneName: "000-222-333",
      email: "example@example.com",
      relationship: "friend",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      middleName: "",
      phoneName: "111-444-555",
      email: "jane@example.com",
      relationship: "sister",
    },
  ],
};

type PersonalDetails = {
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

type PersonalDetailsFieldConfig = {
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

interface EmergencyContact {
  firstName: string;
  lastName: string;
  middleName: string;
  phoneName: string;
  email: string;
  relationship: string;
}

type EmergencyContactFieldConfig = {
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

type SectionData = {
  title: string;
  fields: (PersonalDetailsFieldConfig[] | EmergencyContactFieldConfig[])[];
  data: PersonalDetails | EmergencyContact;
  sx?: SxProps<Theme>;
};


const sections: SectionData[] = [
  {
    title: "Basic Info",
    fields: [personalDetailsField1, personalDetailsField2],
    data: employeeData.personalDetails,
  },
  {
    title: "Address",
    fields: [addressField1, addressField2],
    data: employeeData.personalDetails,
  },
  {
    title: "Contact",
    fields: [contactFields],
    data: employeeData.personalDetails,
    sx: { px: 3 },
  },
  {
    title: "Employment",
    fields: [employmentFields],
    data: employeeData.personalDetails,
    sx: { px: 3 },
  },
  {
    title: "Emergency Contact 1",
    fields: [emergencyContact1Fields1, emergencyContact1Fields2],
    data: employeeData.emergencyContacts[0],
  },
  {
    title: "Emergency Contact 2",
    fields: [emergencyContact1Fields1, emergencyContact1Fields2],
    data: employeeData.emergencyContacts[1],
  },
];


export {
  employeeData,
  personalDetailsField1,
  personalDetailsField2,
  addressField1,
  addressField2,
  contactFields,
  employmentFields,
  emergencyContact1Fields1,
  emergencyContact1Fields2,
  sections,
};
