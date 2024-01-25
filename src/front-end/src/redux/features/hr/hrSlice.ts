import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Employee, OnboardingApplication } from "./hrTypes";
import axios from "axios";

type EmployeeDictionary = {
  [key: string]: Employee;
};

export const fetchEmployeeProfiles = createAsyncThunk(
  "hr/fetchEmployeeProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Employee[]>(
        "http://localhost:8000/hr/getAllEmployeeProfiles"
      );

      // Transform the array into an object
      const transformedData = response.data.reduce<EmployeeDictionary>(
        (acc, employee) => {
          acc[employee._id] = employee;
          return acc;
        },
        {}
      );

      return transformedData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // axios-specific error
        return rejectWithValue(error.message);
      } else {
        // other errors
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

interface EmployeeState {
  employees: EmployeeDictionary;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: {},
  error: null,
};

const hrSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    // other synchronous reducers
    updateVisaDocumentStatus: (state, action) => {
      const { employee_id, type, status, feedback } = action.payload;
      const employee = state.employees[employee_id];
      if (employee && employee.visaStatus && employee.visaStatus.documents) {
        const documentIndex = employee.visaStatus.documents.findIndex(
          (doc) => doc.type === type
        );
        if (documentIndex !== -1) {
          employee.visaStatus.documents[documentIndex].status = status;
          employee.visaStatus.documents[documentIndex].feedback = feedback;
        }
      }
    },
    updateEmployeeOnboardingApplicationStatus: (state, action) => {
      const { employee_id, status, feedback } = action.payload;
      const employee = state.employees[employee_id];
      if (employee && employee.onboardingApplication) {
        employee.onboardingApplication.status = status;
        employee.onboardingApplication.feedback = feedback;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeProfiles.fulfilled, (state, action) => {
      state.employees = action.payload;
      console.log(state.employees);
      state.error = null;
    });
    builder.addCase(fetchEmployeeProfiles.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch employee profiles";
    });
  },
});

export const { updateVisaDocumentStatus, updateEmployeeOnboardingApplicationStatus } = hrSlice.actions;
export default hrSlice.reducer;
