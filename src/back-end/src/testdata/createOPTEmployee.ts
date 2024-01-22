// import User, { IUser } from "../models/User";
// import PersonalInformation, { IPersonalInformation } from "../models/PersonalInformation";
// import OnboardingApplication, { IOnboardingApplication } from "../models/OnboardingApplication";
// import VisaStatus, { IVisaStatus } from "../models/VisaStatus";
// import mongoose from "mongoose";

// const userData: Partial<IUser>[] = [
//   {
//     username: "aliceJohnson",
//     email: "alice.johnson@example.com",
//     password: "hashedPassword1",
//     role: "Employee",
//     isActive: true,
//   },
//   {
//     username: "bobSmith",
//     email: "bob.smith@example.com",
//     password: "hashedPassword2",
//     role: "Employee",
//     isActive: true,
//   },
//   {
//     username: "carolWhite",
//     email: "carol.white@example.com",
//     password: "hashedPassword3",
//     role: "Manager",
//     isActive: true,
//   },
// ];

// // Sample Personal Information Data
// const personalInfoData: Partial<IPersonalInformation>[] = [
//   {
//     // userID: '1234567890abcdef12345678', // Sample User ID
//     firstName: "Alice",
//     lastName: "Johnson",
//     address: {
//       building: "200",
//       street: "Second St",
//       city: "Springfield",
//       state: "IL",
//       zip: "98765",
//     },
//     phoneNumbers: {
//       cell: "234-567-8901",
//     },
//     dateOfBirth: new Date(1990, 6, 15),
//     gender: "Female",
//     emergencyContacts: [
//       {
//         firstName: "Bob",
//         lastName: "Smith",
//         phone: "222-333-4444",
//         email: "bob.smith@example.com",
//         relationship: "Brother",
//       },
//       {
//         firstName: "Mike",
//         lastName: "Doe",
//         phone: "444-555-6666",
//         email: "mike.doe@example.com",
//         relationship: "Father",
//       },
//     ],
//     workAuth: "F1(CPT/OPT)",
//     documents: [
//       {
//         type: "Driver License",
//         url: "url-to-driver-license",
//         documentKey: "example-key"
//       },
//     ],
//   },
//   {
//     // userID: 'abcdef1234567890abcdef12', // Another Sample User ID
//     firstName: "Bob",
//     lastName: "Smith",
//     address: {
//       building: "300",
//       street: "Third Ave",
//       city: "Metropolis",
//       state: "NY",
//       zip: "12321",
//     },
//     phoneNumbers: {
//       cell: "345-678-9012",
//     },
//     dateOfBirth: new Date(1985, 9, 20),
//     gender: "Male",
//     emergencyContacts: [
//       {
//         firstName: "Jane",
//         lastName: "Doe",
//         phone: "333-444-5555",
//         email: "jane.doe@example.com",
//         relationship: "Sister",
//       },
//       {
//         firstName: "Lisa",
//         lastName: "Doe",
//         phone: "777-888-9999",
//         email: "lisa.doe@example.com",
//         relationship: "Sister",
//       },
//     ],
//     workAuth: "F1(CPT/OPT)",
//     documents: [
//       {
//         type: "Passport",
//         url: "url-to-passport",
//         documentKey: "example-key-2"
//       },
//     ],
//   },
//   {
//     // Additional IPersonalInformation entry
//     firstName: "Carol",
//     lastName: "White",
//     address: {
//       building: "400",
//       street: "Fourth Ave",
//       city: "Liberty City",
//       state: "TX",
//       zip: "45678",
//     },
//     phoneNumbers: {
//       cell: "567-890-1234",
//     },
//     dateOfBirth: new Date(1992, 3, 22), // Format: new Date(year, monthIndex, day)
//     gender: "Female",
//     emergencyContacts: [
//       {
//         firstName: "David",
//         lastName: "Johnson",
//         phone: "101-202-3030",
//         email: "david.johnson@example.com",
//         relationship: "Brother",
//       },
//       {
//         firstName: "Sarah",
//         lastName: "Johnson",
//         phone: "404-505-6060",
//         email: "sarah.johnson@example.com",
//         relationship: "Mother",
//       },
//     ],
//     workAuth: "F1(CPT/OPT)",
//     documents: [
//       {
//         type: "Student ID",
//         url: "url-to-student-id",
//         documentKey: "example-key-3"
//       },
//     ],
//   },
//   // Add more test data as needed
// ];

// // Sample Onboarding Application Data
// const onboardingApplicationData: Partial<IOnboardingApplication>[] = [
//   {
//     // userID: '1234567890abcdef12345678', // Sample User ID (link to an actual user)
//     status: "Pending",
//     feedback: "",
//     submittedDate: new Date(),
//     // reviewedDate: null,
//     // applicationData: '1234567890abcdef12345678', // Link to actual personal information
//   },
//   {
//     // userID: 'abcdef1234567890abcdef12', // Another Sample User ID (link to another actual user)
//     status: "Approved",
//     feedback: "All documents are in order.",
//     submittedDate: new Date(),
//     reviewedDate: new Date(),
//     // applicationData: 'abcdef1234567890abcdef12', // Link to another actual personal information
//   },
//   {
//     // userID: 'fghijklmnopqrstuvwxyz12345', // Sample User ID (link to an actual user)
//     status: "Rejected",
//     feedback:
//       "Missing required documents. Please upload the missing documents.",
//     submittedDate: new Date(2022, 5, 10), // Use specific date as per your requirement
//     reviewedDate: new Date(2022, 5, 12), // Use specific date as per your requirement
//     // applicationData: 'fghijklmnopqrstuvwxyz12345' // Link to actual personal information
//   },
//   // Add more test data as needed
// ];

// // Sample Visa Status Data for OPT
// const visaStatusData: Partial<IVisaStatus>[] = [
//   {
//     // userID: 'user-id-1', // Sample User ID (link to an actual user)
//     visaType: "OPT",
//     status: "Pending",
//     startDate: new Date(),
//     endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
//     documents: [
//       {
//         type: "OPT Receipt",
//         url: "url-to-opt-receipt",
//         status: "Approved", // This document is approved
//         feedback: "Approved OPT Receipt",
//       },
//       {
//         type: "OPT EAD",
//         url: "url-to-opt-ead",
//         status: "Pending", // Pending as the previous document is approved
//         // feedback: null
//       },
//       {
//         type: "I-983",
//         url: "url-to-i983",
//         status: "Locked", // Locked as the previous document is not approved yet
//         // feedback: null
//       },
//       {
//         type: "I-20",
//         url: "url-to-i20",
//         status: "Locked", // Locked as the previous document is not approved yet
//         // feedback: null
//       },
//     ],
//   },

//   // Second entry where a document is rejected
//   {
//     // userID: 'user-id-2', // Sample User ID (link to an actual user)
//     visaType: "OPT",
//     status: "Pending",
//     startDate: new Date(),
//     endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
//     documents: [
//       {
//         type: "OPT Receipt",
//         url: "url-to-opt-receipt-2",
//         status: "Approved",
//         feedback: "Receipt Approved",
//       },
//       {
//         type: "OPT EAD",
//         url: "url-to-opt-ead-2",
//         status: "Rejected", // This document is rejected
//         feedback: "Insufficient evidence provided.",
//       },
//       {
//         type: "I-983",
//         url: "url-to-i983-2",
//         status: "Locked", // Locked as the previous document is rejected
//         // feedback: null
//       },
//       {
//         type: "I-20",
//         url: "url-to-i20-2",
//         status: "Locked", // Locked as the previous document is rejected
//         // feedback: null
//       },
//     ],
//   },

//   // Third entry where all documents are pending
//   {
//     // userID: 'user-id-3', // Sample User ID (link to an actual user)
//     visaType: "OPT",
//     status: "Pending",
//     startDate: new Date(),
//     endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
//     documents: [
//       {
//         type: "OPT Receipt",
//         url: "url-to-opt-receipt-3",
//         status: "Pending",
//         // feedback: null
//       },
//       {
//         type: "OPT EAD",
//         url: "url-to-opt-ead-3",
//         status: "Locked", // Locked as the previous document is pending
//         // feedback: null
//       },
//       {
//         type: "I-983",
//         url: "url-to-i983-3",
//         status: "Locked", // Locked as the previous document is pending
//         // feedback: null
//       },
//       {
//         type: "I-20",
//         url: "url-to-i20-3",
//         status: "Locked", // Locked as the previous document is pending
//         // feedback: null
//       },
//     ],
//   },
//   // Add more test data as needed
// ];

// require('dotenv').config();

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URL!)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB", err));

// async function createUsersWithData() {
//   try {
//     for (let i = 0; i < userData.length; i++) {
//       const newUser = new User(userData[i]);
//       await newUser.save();

//       const newPersonalInfo = new PersonalInformation({
//         ...personalInfoData[i],
//         userID: newUser._id,
//       });
//       await newPersonalInfo.save();

//       const newVisaStatus = new VisaStatus({
//         ...visaStatusData[i],
//         userID: newUser._id,
//       });
//       await newVisaStatus.save();

//       const newOnboardingApplication = new OnboardingApplication({
//         ...onboardingApplicationData[i],
//         applicationData: newPersonalInfo._id,
//         userID: newUser._id,
//       });
//       await newOnboardingApplication.save();

//       // Update user with references to PersonalInformation, VisaStatus, and OnboardingApplication
//       newUser.personalInformation = newPersonalInfo._id;
//       newUser.visaStatus = newVisaStatus._id;
//       newUser.onboardingApplication = newOnboardingApplication._id;
//       await newUser.save();

//       console.log("User created with associated data:", newUser);
//     }
//   } catch (error) {
//     console.error("Failed to create users with data:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   }
// }

// createUsersWithData();
