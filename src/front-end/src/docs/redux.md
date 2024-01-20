# Redux Store Usage and Extension 
## Using the Store in Components
### useDispatch
```typescript
import { useDispatch } from './redux/hooks/useDispatch';
const dispatch = useDispatch();
dispatch(yourActionCreator());
```
- use `useDispatch` from the `hooks` file, rather than from redux library

### useTypedSelector
```typescript
import { useTypedSelector } from './redux/hooks/useDispatch';
const yourStateSlice = useTypedSelector(state => state.yourReducer);
```

## Adding a New Slice/Reducer
1. create slice in `/redux/features/`:
```typescript
import { createSlice } from '@reduxjs/toolkit';
const yourSlice = createSlice({
  name: 'yourSlice',
  initialState,
  reducers: {
    // Reducers
  },
  // Extra reducers for handling async actions
});
export const { actions } = yourSlice;
export default yourSlice.reducer;
```
2. add to store:
```typescript
import yourReducer from '../features/yourFeature/yourSlice';

const store = configureStore({
  reducer: {
    // existing reducers
    yourFeature: yourReducer,
  },
  // middleware
});
```