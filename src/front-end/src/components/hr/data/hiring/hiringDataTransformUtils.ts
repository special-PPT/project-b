import axios from "axios";
import {
  Employee,
  HrManagement,
  OnboardingApplication,
  Document,
} from "../../../../redux/features/hr/hrTypes";
import {
  RegDataInterface,
  HistoryRow,
  OnboardData,
  FileTableEntry,
} from "./EmployeeDataInterfaces";
function formatDate(dateString: string) {
  return dateString.split("T")[0];
}

export const transformEmployeeToRegData = (
  employee: Employee
): RegDataInterface => {
  const employeeId = employee._id;
  const name = `${employee.personalInformation.firstName} ${employee.personalInformation.lastName}`;
  const email = employee.email;
  const tokenExpired =
    employee.registrationToken &&
    new Date(employee.registrationToken.expiry) < new Date();
  const generateTokenAndSendEmail =
    !employee.isActive && (!employee.registrationToken || tokenExpired);
  const status = employee.isActive ? "Active" : "Inactive";

  return {
    employee_id: employeeId,
    name,
    email,
    generate_token_and_send_email: generateTokenAndSendEmail,
    status,
  };
};

export async function getHrManagementData(hrId: string): Promise<HistoryRow[]> {
  try {
    const response = await axios.get(
      `http://localhost:8000/hr/get-hrmanagement-data`,
      {
        params: { hrUserId: hrId },
      }
    );
    return transformHrToHistoryData(response.data);
  } catch (error) {
    console.error("Error fetching HR Management Data:", error);
    throw error;
  }
}

function transformHrToHistoryData(hrData: HrManagement): HistoryRow[] {
  return hrData.employeeProfiles.map((user, index) => {
    const token = hrData.registrationTokens[index];
    const isExpired = new Date(token.expiry) < new Date();

    return {
      email: user.email,
      name: token.name,
      registrationLink: `http://localhost:3000/${token.token}`,
      status: isExpired ? "Expired" : "Active",
    };
  });
}

export function transformEmployeeToOnboardData(employee: Employee): OnboardData {
  return {
    employee_id: employee._id,
    name: employee.username,
    email: employee.email,
    status: employee.onboardingApplication.status
  };
}

export function transformPersonalDetails(employee: Employee) {
  const personalProfile = {
    profilePicture: !employee.personalInformation.profilePicture
      ? "https://wallpapers-clan.com/wp-content/uploads/2023/06/sad-ghost-dark-blue-background.jpg"
      : employee.personalInformation.profilePicture,
    firstName: employee.personalInformation.firstName,
    lastName: employee.personalInformation.lastName,
    middleName: employee.personalInformation.middleName,
    preferredName: employee.personalInformation.preferredName,
    DOB: formatDate(employee.personalInformation.dateOfBirth),
    gender: employee.personalInformation.gender,
    SSN: employee.personalInformation.ssn,
    street: employee.personalInformation.address.street,
    buildingOrApt: employee.personalInformation.address.building,
    city: employee.personalInformation.address.city,
    state: employee.personalInformation.address.state,
    zip: employee.personalInformation.address.zip,
    email: employee.email,
    cellPhone: employee.personalInformation.phoneNumbers.cell,
    workingPhone: employee.personalInformation.phoneNumbers.work,
    visaType: employee.visaStatus.visaType,
    visaStartDate: formatDate(employee.visaStatus.startDate),
    visaEndDate: formatDate(employee.visaStatus.endDate),
  };
  const contacts = employee.personalInformation.emergencyContacts.map(
    (contact) => ({
      firstName: contact.firstName,
      lastName: contact.lastName,
      middleName: contact.middleName,
      phoneName: contact.phone,
      email: contact.email,
      relationship: contact.relationship,
    })
  );
  return { personalProfile, contacts };
}

export function transformProfileDocuments(
  documents: Document[]
): FileTableEntry[] {
  return documents.map((doc) => ({
    name: doc.type,
    modifiedTime: "",
    size: "",
    url: doc.url,
  }));
}
