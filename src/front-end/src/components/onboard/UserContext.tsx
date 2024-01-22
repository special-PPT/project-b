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
  reference?: {};
  emergencyContacts?: [];
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
  firstName: 'Zhengmao Zhang Context',
  lastName: '',
  middleName: '',
  profilePicture: '',
  address: {
    building: '5692 SW Lee Ave',
    street: '',
    city: '',
    state: '',
    zip: '',
  },
  phoneNumbers: {
    cell: '',
    work: '',
  },
  socialSecurityNumber: '',
  dateOfBirth: new Date(),
  gender: '',
  workAuthorization: '',
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
    const keys = id.split('.'); // 将 id 分割成路径数组
  
    setUserInfo((userInfo: AllInfoData) => {
      let updatedInfo = { ...userInfo }; // 创建 userInfo 的浅拷贝
  
      if (keys.length > 1) {
        // 深度遍历和更新嵌套对象
        let temp = updatedInfo; // 使用临时变量来逐层深入
        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];
          if (!temp[key]) temp[key] = {}; // 如果路径不存在，则初始化为空对象
          if (i === keys.length - 2) {
            temp[key][keys[keys.length - 1]] = value; // 在最深层设置值
          } else {
            temp = temp[key]; // 向下钻取到下一层
          }
        }
      } else {
        // 非嵌套属性直接更新
        updatedInfo[keys[0]] = value;
      }
  
      return updatedInfo;
    });
    console.log(userInfo);
  };
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, handleChange: handleInputChange }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using context
export const useUser = () => useContext(UserContext);
