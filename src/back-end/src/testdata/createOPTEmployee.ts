import User, { IUser } from "../models/User";
import PersonalInformation, {
  IPersonalInformation,
  IEmergencyContact,
  IDocumentSubSchema,
} from "../models/PersonalInformation";
import OnboardingApplication, {
  IOnboardingApplication,
} from "../models/OnboardingApplication";
import VisaStatus, { IVisaStatus } from "../models/VisaStatus";
import { faker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

const createContact = (): IEmergencyContact => ({
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
});

const createDocument = (type: string): IDocumentSubSchema => ({
  type,
  url: "www.google.com",
  documentKey: "example-key",
});

const generateRandomUserData = (
  numEmployee: number
): [Partial<IUser>[], Partial<IPersonalInformation>[]] => {
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
      reference: createContact(),
      emergencyContacts: [createContact(), createContact()],
      workAuth: faker.helpers.arrayElement([
        "Green Card",
        "Citizen",
        "H1B",
        "L2",
        "H4",
        "F1(CPT/OPT)",
        "F1(CPT/OPT)",
        "F1(CPT/OPT)",
        "F1(CPT/OPT)",
        "F1(CPT/OPT)",
        "Other",
      ]),
      // more likely to generate "F1(CPT/OPT)" users
      documents: ["Driver License1", "Driver License2", "Driver License3"].map(
        createDocument
      ),
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
  isActive: boolean,
  userId: string,
  workAuth: string
): Partial<IVisaStatus> => {
  if (isActive === false && workAuth !== "F1(CPT/OPT)") {
    return {
      userID: new ObjectId(userId),
      visaType: "None",
      status: "Approved",
      startDate: new Date("1111-11-11"),
      endDate: new Date("1111-11-11"),
      documents: [],
    };
  }

  const documents = [];
  const documentTypes = ["OPT Receipt", "OPT EAD", "I-983", "I-20"];
  const lastDocumentIndex = faker.datatype.number({
    min: 0,
    max: documentTypes.length - 2,
  });
  let overallStatus = "Approved";

  for (let i = 0; i <= lastDocumentIndex; i++) {
    const docType = documentTypes[i];
    let status = "Approved";

    if (docType === "I-983") {
      status = faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]);
    }

    const document = {
      type: docType,
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      status: status,
      feedback: status === "Rejected" ? "feedback is here..." : "",
    };

    documents.push(document);

    // Update overall status based on the most recent document
    if (status === "Pending" || status === "Rejected") {
      overallStatus = status;
    }
  }

  // Check if all documents are approved
  if (documents.every((doc) => doc.status === "Approved")) {
    overallStatus = "Approved";
  }

  return {
    userID: new ObjectId(userId),
    visaType: "OPT",
    status: overallStatus,
    startDate: new Date(faker.date.past()),
    endDate: new Date(faker.date.future()),
    documents: documents,
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
        newUser.isActive,
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
