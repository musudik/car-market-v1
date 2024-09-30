export const isAuthenticated = () => {
    // Check if the JWT token is present in localStorage
    const token = localStorage.getItem('token');
    return token !== null;
  };