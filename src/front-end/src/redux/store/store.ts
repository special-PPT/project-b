import { configureStore } from '@reduxjs/toolkit';
import hrReducer from '../features/hr/hrSlice';
import UserSlicer from '../features/onboard/UserSlicer';
import onboardSlicer from '../features/hr/onboardSlice';

const store = configureStore({
    reducer: {
      hr: hrReducer,
      user: UserSlicer,
      onboarding: onboardSlicer, 
      // other reducers go here, if you have any
    },
    // middleware can be added here
  });
  
  // Types for RootState and AppDispatch
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;