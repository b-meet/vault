import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useCallback, useEffect } from 'react';
import { REFRESH_THRESHOLD, ROUTES } from '../constants';
import { store } from '../redux/store';
import { refreshUserToken } from '../redux/thunk/userThunk';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH);
    }
  }, [isAuthenticated, navigate]);

  // Function to check authentication before API calls
  const checkAuth = useCallback(async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.AUTH);
      return false;
    }

    // Check if token needs refresh
    const state = store.getState();
    const { sessionExpiry } = state.user;
    
    if (sessionExpiry) {
      const now = Date.now();
      const timeUntilExpiry = sessionExpiry - now;

      if (timeUntilExpiry <= REFRESH_THRESHOLD) {
        try {
          await dispatch(refreshUserToken()).unwrap();
        } catch (error) {
          navigate(ROUTES.AUTH);
          console.error('Failed to refresh token:', error);
          return false;
        }
      }
    }

    return true;
  }, [isAuthenticated, dispatch, navigate]);

  return {
    isAuthenticated,
    user,
    checkAuth
  };
};
