const AUTH_TOKEN = process.env.AUTH_TOKEN || "authToken";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN);
  }
};

export const setToken = (token: string) => {
  if (token && typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
  }
};
