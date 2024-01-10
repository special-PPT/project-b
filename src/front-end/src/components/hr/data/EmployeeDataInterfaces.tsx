export interface DocumentInterface {
  documentName: string;
  lastModifiedDate: string;
  documentSize: string;
  canDownload: boolean;
  canPreview: boolean;
  documentUrl: string;
}

export interface EmployeeDataInterface {
  avatar: string;
  basic_info: {
    name: string;
    employee_id: string;
    ssn: string;
    work_auth: string;
    phone: string;
    email: string;
    dob: string;
    gender: string;
    preferred_name: string;
  };
  address: {
    street: string;
    building: string;
    city: string;
    state: string;
    zip_code: string;
  };
  contact: {
    email: string;
    cell_phone: string;
    work_phone: string;
  };
  visa_status: {
    visa_title: string;
    start_date: string;
    end_date: string;
  };
  reference: {
    name: string;
    phone_number: string;
    email: string;
    relationship: string;
  };
  emergency_contact1: {
    name: string;
    phone: string;
    relationship: string;
    email: string;
  };
  emergency_contact2: {
    name: string;
    phone: string;
    relationship: string;
    email: string;
  };
}