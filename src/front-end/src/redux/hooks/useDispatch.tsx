import { useDispatch as reduxUseDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
