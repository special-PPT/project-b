export interface Employee {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  personalInformation: PersonalInformation;
  onboardingApplication: string;
  visaStatus: VisaStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
  registrationToken: RegistrationToken;
}

interface RegistrationToken {
  _id: string;
  createdAt: string;  // ISO date string format
  email: string;
  expiry: string;     // ISO date string format
  name: string;
  status: string;
  token: string;
  updatedAt: string;  // ISO date string format
  userId: string;
  __v: number;
}

interface PersonalInformation {
  address: Address;
  phoneNumbers: PhoneNumbers;
  _id: string;
  userID: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  profilePicture: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  reference: EmergencyContact,
  emergencyContacts: EmergencyContact[];
  workAuth: string;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Address {
  building: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface PhoneNumbers {
  cell: string;
  work: string;
}

interface EmergencyContact {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  email: string;
  relationship: string;
  _id: string;
}

export interface Document {
  type: string;
  url: string;
  _id: string;
}

interface DocumentSub {
  type: string;
  url: string;
  status: string;
  feedback?: string;
}

interface VisaStatus {
  _id: string;
  userID: string;
  visaType: string;
  status: string;
  startDate: string; // ISO date string format
  endDate: string;   // ISO date string format
  documents: DocumentSub[]; 
  createdAt: string; // ISO date string format
  updatedAt: string; // ISO date string format
  __v: number;
}

// structure needed by HrEmployeeProfiles
export interface HrEmployeeProfileData {
  employee_id: string;
  name: string;
  ssn: string; 
  work_auth: string;
  phone: string;
  email: string;
}

interface User {
  createdAt: string;
  updatedAt: string;
  email: string;
  isActive: boolean;
  onboardingApplication: string;
  password: string;
  personalInformation: string;
  registrationToken: string;
  role: string;
  username: string;
  visaStatus: string;
  __v: number;
  _id: string;
}

export interface HrManagement {
  createdAt: string;
  updatedAt: string;
  userID: string;
  __v: number;
  _id: string;
  employeeProfiles: User[]; 
  registrationTokens: RegistrationToken[];
}
