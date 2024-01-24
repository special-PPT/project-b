import React, { createContext, useContext, useState } from 'react';

// Interfaces
interface Address {
  building: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface PhoneNumbers {
  cell: string;
  work: string;
}

interface AllInfoData {
  [key: string]: any;
  firstName: string;
  lastName: string;
  middleName: string;
  profilePicture: string;
  address: Address;
  phoneNumbers: PhoneNumbers;
  socialSecurityNumber: string;
  dateOfBirth: Date;
  gender: string;
  reference: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    relationship: string;
  };
  emergencyContacts?:{
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    relationship: string;
  }[];
  workAuthorization: string;
  documents?: [];
}

interface UserContextType {
  userInfo: AllInfoData;
  setUserInfo: React.Dispatch<React.SetStateAction<AllInfoData>>,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

// Initial state
const initialState: AllInfoData = {
  firstName: '',
  lastName: '',
  middleName: '',
  profilePicture: '',
  address: {
    building: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  phoneNumbers: {
    cell: '',
    work: '',
  },
  reference: {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    relationship: '',
  },
  // emergencyContacts?: [],
  socialSecurityNumber: '',
  dateOfBirth: new Date(),
  gender: '',
  workAuthorization: 'H1B',
};

// Context creation
export const UserContext = createContext<UserContextType>({
  userInfo: initialState,
  setUserInfo: () => {},
  handleChange: () => {},
});

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<AllInfoData>(initialState);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const keys = id.split('.');

        setUserInfo((prev: AllInfoData) => {
            const updatedInfo = { ...prev };
            let temp: any = updatedInfo;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!temp[keys[i]]) {
                    temp[keys[i]] = {};
                }
                temp = temp[keys[i]];
            }

            temp[keys[keys.length - 1]] = value;
            console.log(updatedInfo);
            return updatedInfo;
        });
    };
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, handleChange: handleInputChange }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using context
export const useUser = () => useContext(UserContext);
