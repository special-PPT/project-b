import User, { IUser } from "../models/User"; // Adjust the import path
import PersonalInformation, {
  IPersonalInformation,
} from "../models/PersonalInformation"; // Adjust the import path
import OnboardingApplication, {
  IOnboardingApplication,
} from "../models/OnboardingApplication"; // Adjust the import path


require('dotenv').config();

// HR User details
const hrUserInfo: Partial<IUser> = {
  username: "hrUser",
  email: "hr@example.com",
  password: "password", // In a real application, ensure this is hashed
  role: "HR",
  isActive: true,
  // ... other required fields
};

const hrPersonalInfo: Partial<IPersonalInformation> = {
  firstName: "John",
  lastName: "Doe",
  middleName: "HR",
  preferredName: "Johnny",
  profilePicture: "url-to-profile-picture",
  address: {
    building: "100",
    street: "Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  },
  phoneNumbers: {
    cell: "123-456-7890",
    work: "098-765-4321",
  },
  dateOfBirth: new Date(1980, 1, 1),
  gender: "Male",
  emergencyContacts: [
    {
      firstName: "Jane",
      lastName: "Doe",
      middleName: "",
      phone: "111-222-3333",
      email: "jane.doe@example.com",
      relationship: "Spouse",
    },
  ],
  workAuth: "H1B",
  documents: [
    {
      type: "Passport",
      url: "url-to-passport-doc",
      documentKey: "example-key-1"
    },
    {
      type: "Visa",
      url: "url-to-visa-doc",
      documentKey: "example-key-2"
    },
  ],
};

const hrOnboardingApplication: Partial<IOnboardingApplication> = {
  status: "Approved",
  feedback: "All documents are in order.",
  submittedDate: new Date(),
  reviewedDate: new Date(),
};

export async function createHRUser() {
  try {
    // Create User with references to PersonalInformation and OnboardingApplication
    const user = new User(hrUserInfo);
    await user.save();
    console.log(user);

    // Create PersonalInformation
    hrPersonalInfo.userID = user._id;
    const personalInfo = new PersonalInformation(hrPersonalInfo);
    await personalInfo.save();
    console.log(personalInfo);

    // Create OnboardingApplication
    hrOnboardingApplication.userID = user._id;
    hrOnboardingApplication.applicationData = personalInfo._id;
    const onboardingApplication = new OnboardingApplication(
      hrOnboardingApplication
    );
    await onboardingApplication.save();
    console.log(onboardingApplication);

    // Update the personalInfo and onboardingApplication for a new user
    user.personalInformation = personalInfo._id;
    user.onboardingApplication = onboardingApplication._id;
    await user.save();
    console.log(user);

    console.log("HR user created successfully:", user);

  } catch (error) {
    console.error("Failed to create HR user:", error);
  }
}