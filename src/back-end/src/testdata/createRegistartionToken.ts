import RegistrationToken from "../models/RegistrationToken";
import User from "../models/User";
import mongoose from "mongoose";

// MongoDB connection string
const dbUri = "mongodb+srv://hangwei:hangwei@cluster0.qah3pgm.mongodb.net/"; // Replace with your MongoDB URI

// Connect to MongoDB
mongoose
  .connect(dbUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));


const registrationTokensData = [
  {
    name: "hrUser",
    token: "token1",
    email: "hr@example.com",
    expiry: new Date(),
    status: "Sent",
    userId: "65a5fdd9254cf443d0fc92e4",
  },
  {
    name: "aliceJohnson",
    token: "token2",
    email: "alice.johnson@example.com",
    expiry: new Date(),
    status: "Sent",
    userId: "65a734bd46019f5d95cc2f93",
  },
  {
    name: "bobSmith",
    token: "token3",
    email: "bob.smith@example.com",
    expiry: new Date(),
    status: "Sent",
    userId: "65a734be46019f5d95cc2fa5",
  },
  {
    name: "carolWhite",
    token: "token4",
    email: "carol.white@example.com",
    expiry: new Date(),
    status: "Sent",
    userId: "65a734bf46019f5d95cc2fb5",
  },
];

async function insertRegistrationTokens() {
    try {
      for (const tokenData of registrationTokensData) {
        // Create and save the RegistrationToken
        const token = new RegistrationToken(tokenData);
        await token.save();
  
        // Find the corresponding user and update their registrationToken field
        await User.findByIdAndUpdate(tokenData.userId, {
          $set: { registrationToken: token._id }
        });
  
        console.log("Registration token inserted and user updated:", token);
      }
    } catch (error) {
      console.error("Failed to insert registration tokens:", error);
    } finally {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }

insertRegistrationTokens();
