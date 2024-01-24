import HRManagement from "../models/HRManagement";
import RegistrationToken from "../models/RegistrationToken";
import User from "../models/User";

require("dotenv").config();

// Sample HRManagement Data
export async function insertHRManagementData() {
  try {
    // Retrieve all users with the role of 'HR'
    const hrs = await User.find({ role: "HR" });

    // Check if there are HRs in the database
    if (hrs.length === 0) {
      console.log(
        "No HRs found in the database. Skipping HR management data insertion."
      );
      return;
    }

    // Retrieve all registration tokens
    const tokens = await RegistrationToken.find({}).populate("userId");
    // Map to get token IDs and corresponding employee user IDs
    const tokenIds = tokens.map((token) => token._id);
    const employeeIds = tokens.map((token) => token.userId);

    for (const hr of hrs) {
      const hrManagementData = {
        userID: hr._id,
        registrationTokens: tokenIds,
        employeeProfiles: employeeIds,
      };

      const hrManagement = new HRManagement(hrManagementData);
      await hrManagement.save();

      console.log("HRManagement data inserted for HR:", hr.username);
    }
  } catch (error) {
    console.error("Failed to insert HRManagement data:", error);
  }
}

insertHRManagementData();
