import axios from "axios";
import { Employee, HrManagement } from "../../../../redux/features/hr/hrTypes";
import { RegDataInterface, HistoryRow } from "./EmployeeDataInterfaces";

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
