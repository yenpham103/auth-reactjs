export const requestLogin = async (data) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const saveToken = (token) => {
  localStorage.setItem("authToken", JSON.stringify(token));
};
export const getToken = () => {
  try {
    const token = JSON.parse(localStorage.getItem("authToken"));
    if (token) {
      if (token.access_token && token.refresh_token) return token;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const removeToken = () => {
  localStorage.removeItem("authToken");
};

export const getUsers = async () => {
  const { access_token: accessToken } = getToken();
  if (accessToken) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        const newToken = await requestRefreshToken();
        if (newToken) {
          saveToken(newToken);
          return getUsers();
        }
        throw new Error("Failed to fetch users");
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
};
export const logout = () => {
  removeToken();
};

export const requestRefreshToken = async () => {
  const { refresh_token: refreshToken } = getToken();
  if (refreshToken) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }
};
