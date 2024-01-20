export interface Employee {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  personalInformation: PersonalInformation;
  onboardingApplication: string;
  visaStatus: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  registrationToken: string;
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
  gender: string;
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

interface Document {
  type: string;
  url: string;
  _id: string;
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