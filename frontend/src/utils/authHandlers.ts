import axios from 'axios';
import errorAlert from './errorAlert';
import { User } from '../types/User';

export const getCookieValue = (name: any) => {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');

    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

export const getUserData = async (
  setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  try {
    const response = await axios.get(`/api/users/getuser`, {
      withCredentials: true
    });
    setUser(response.data);
  } catch (error: any) {
    if (error.response.status !== 401)
      errorAlert('Something went wrong while logging in');
  }
};

export const logout = async (
  setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  const response = await axios.get(`/api/auth/logout`, {
    withCredentials: true
  });
  setUser({ _id: '', nickname: '', email: '', firstName: '', lastName: '' });
};
