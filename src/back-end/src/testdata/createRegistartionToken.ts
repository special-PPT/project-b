import RegistrationToken from "../models/RegistrationToken";
import User from "../models/User";
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();

export async function insertRegistrationTokens() {
  try {
    // Fetch users with the role 'Employee' and isActive false
    const users = await User.find({ role: 'Employee', isActive: false });

    for (const user of users) {
      // Create a new registration token for each user
      const tokenData = {
        name: user.username,
        token: uuidv4(), 
        email: user.email,
        expiry: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
        status: "Sent",
        userId: user._id,
      };

      const token = new RegistrationToken(tokenData);
      await token.save();

      // Update user with the new registration token
      await User.findByIdAndUpdate(user._id, { $set: { registrationToken: token._id } });

      console.log("Registration token inserted and user updated:", token);
    }
  } catch (error) {
    console.error("Failed to insert registration tokens:", error);
  } finally {
  }
}