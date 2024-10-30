import { AuthProvider, HttpError } from "react-admin";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch('https://myapp.local/api/auth/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // To send cookies with the request
        body: JSON.stringify({ email: username, password }),
      });

      if (!response.ok) {
        throw new HttpError("Invalid credentials", 401);
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(
        error instanceof HttpError ? error : new HttpError("Server error", 500)
      );
    }
  },
  logout: async () => {
    try {
      const response = await fetch('https://myapp.local/api/auth/auth/logout', {
        method: 'POST',
        credentials: 'include', 
      });

      if (!response.ok) {
        throw new HttpError("Logout failed", 500);
      }

      localStorage.removeItem("user");
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(
        error instanceof HttpError ? error : new HttpError("Server error", 500)
      );
    }
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => 
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(undefined),
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;
    return Promise.resolve(user);
  },
};

export default authProvider;
