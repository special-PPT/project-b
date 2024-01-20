import User, { IUser } from "../models/User";
import PersonalInformation, {
  IPersonalInformation,
} from "../models/PersonalInformation";
import OnboardingApplication, {
  IOnboardingApplication,
} from "../models/OnboardingApplication";
import VisaStatus, { IVisaStatus } from "../models/VisaStatus";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

const generateRandomUserData = (numEmployee: number): [
  Partial<IUser>[],
  Partial<IPersonalInformation>[]
] => {
  const users: Partial<IUser>[] = [];
  const personalInfos: Partial<IPersonalInformation>[] = [];

  for (let i = 0; i < numEmployee; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const user: Partial<IUser> = {
      username: faker.internet.userName({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      password: "password",
      role: "Employee",
      isActive: faker.datatype.boolean(),
    };

    const personalInfo: Partial<IPersonalInformation> = {
      firstName: firstName,
      lastName: lastName,
      ssn: "111-11-11",
      address: {
        building: Math.floor(Math.random() * (999 - 100 + 1) + 100).toString(),
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zip: faker.location.zipCode(),
      },
      phoneNumbers: {
        cell: faker.phone.number(),
      },
      dateOfBirth: faker.date.birthdate(),
      gender: faker.person.sex(),
      emergencyContacts: [
        {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
          relationship: faker.helpers.arrayElement([
            "Mother",
            "Sister",
            "Friend",
            "Brother",
            "Father",
          ]),
        },
      ],
      workAuth: faker.helpers.arrayElement([
        "Green Card",
        "F1(CPT/OPT)",
        "H1B",
      ]),
      documents: [
        {
          type: "Driver License",
          url: "www.google.com",
          documentKey: "example-key",
        },
      ],
    };

    users.push(user);
    personalInfos.push(personalInfo);
  }

  return [users, personalInfos];
};

// Sample Onboarding Application Data
const generateOnboardingApplicationData = (
  userId: string
): Partial<IOnboardingApplication> => {
  const status = faker.helpers.arrayElement([
    "Pending",
    "Approved",
    "Rejected",
  ]);

  return {
    userID: new ObjectId(userId),
    status: status,
    feedback:
      status === "Rejected"
        ? "Missing required documents. Please upload the missing documents."
        : "",
    submittedDate: new Date(),
    reviewedDate: status !== "Pending" ? new Date() : undefined,
  };
};

const generateVisaStatusData = (
  userId: string,
  workAuth: string
): Partial<IVisaStatus> => {
  if (workAuth === "Green Card") {
    return {
      userID: new ObjectId(userId),
      visaType: "Green Card",
      status: "Approved",
      startDate: new Date("1111-11-11"),
      endDate: new Date("1111-11-11"),
      documents: [],
    };
  }

  return {
    userID: new ObjectId(userId),
    visaType: workAuth === "F1(CPT/OPT)" ? "OPT" : "H1B",
    status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
    startDate: new Date(faker.date.past()),
    endDate: new Date(faker.date.future()),
    documents: [
      {
        type: "OPT Receipt",
        url: "url-to-opt-receipt",
        status: faker.helpers.arrayElement(["Approved", "Pending", "Locked"]),
        feedback: "Approved OPT Receipt",
      },
      // Add more documents as needed
    ],
  };
};

require("dotenv").config();

export async function createUsersWithData(numEmployee: number) {
  try {
    const [userData, personalInfoData] = generateRandomUserData(numEmployee);

    for (let i = 0; i < userData.length; i++) {
      // Create new User
      const newUser = new User(userData[i]);
      await newUser.save();

      // Create new PersonalInformation
      const newPersonalInfo = new PersonalInformation({
        ...personalInfoData[i],
        userID: newUser._id,
      });
      await newPersonalInfo.save();

      // Generate and save OnboardingApplication
      const onboardingApplicationData = generateOnboardingApplicationData(
        newUser._id.toString()
      );
      const newOnboardingApplication = new OnboardingApplication({
        ...onboardingApplicationData,
        applicationData: newPersonalInfo._id, // Include applicationData here
      });
      await newOnboardingApplication.save();

      // Generate and save VisaStatus
      const visaStatusData = generateVisaStatusData(
        newUser._id.toString(),
        newPersonalInfo.workAuth
      );
      const newVisaStatus = new VisaStatus(visaStatusData);
      await newVisaStatus.save();

      // Update user with references to PersonalInformation, VisaStatus, and OnboardingApplication
      newUser.personalInformation = newPersonalInfo._id;
      newUser.visaStatus = newVisaStatus._id;
      newUser.onboardingApplication = newOnboardingApplication._id;
      await newUser.save();

      console.log("User created with associated data:", newUser);
    }
  } catch (error) {
    console.error("Failed to create users with data:", error);
  } finally {
  }
}
