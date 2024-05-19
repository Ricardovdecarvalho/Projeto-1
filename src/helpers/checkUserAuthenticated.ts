export const checkUserAuthenticated = () => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('access_token');
    return token;
  }

  return false;
};
