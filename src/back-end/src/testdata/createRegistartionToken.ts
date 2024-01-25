import RegistrationToken from "../models/RegistrationToken";
import User from "../models/User";
import { v4 as uuidv4 } from 'uuid';

require('dotenv').config();

export async function insertRegistrationTokens() {
  try {
    // Fetch users with the role 'Employee' and isActive false
    const users = await User.find({ role: 'Employee', isActive: false });

    for (const user of users) {
      // 30% chance to create a token
      if (Math.random() < 0.6) {
        // 50% chance the token is expired
        const isExpired = Math.random() < 0.3;
        let expiryDate = new Date();

        if (isExpired) {
          // Set expiry date to a past date
          expiryDate.setDate(expiryDate.getDate() - Math.floor(Math.random() * 10 + 1)); // 1-10 days in the past
        } else {
          // Set expiry date to a future date
          expiryDate.setDate(expiryDate.getDate() + Math.floor(Math.random() * 10 + 1)); // 1-10 days in the future
        }

        const tokenData = {
          name: user.username,
          token: uuidv4(),
          email: user.email,
          expiry: expiryDate,
          status: "Sent",
          userId: user._id,
        };

        const token = new RegistrationToken(tokenData);
        await token.save();

        // Update user with the new registration token
        await User.findByIdAndUpdate(user._id, { $set: { registrationToken: token._id } });

        console.log("Registration token inserted and user updated:", token);
      }
    }
  } catch (error) {
    console.error("Failed to insert registration tokens:", error);
  }
}