

const API_BASE_URL = 'http://localhost:8080';


export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return await response.text();
};

export const loginUser = async (username, password, setAccessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.log("---");
      
      const errorData = await response.json();
      console.error("Login Error:", errorData);
      throw new Error(errorData.error || "Login failed");
    }

    const result = await response.json();
    setAccessToken(result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    return result;
  } catch (error) {
    console.error("Network Error:", error);
    throw new Error("Network error. Please check the backend.");
  }
};


export const refresh = async (setAccessToken) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshResponse.ok) {
    console.error("Refresh token invalid. Logging out...");
    // logoutUser();
    return false;
  }

  const refreshData = await refreshResponse.json();

  // Store new access token
  setAccessToken(refreshData.accessToken);
  return refreshData;

  // const response = await fetch(`${API_BASE_URL}/myProfile`, {
  //   method: 'GET',
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // });

  // return response.ok;
};

export const logoutUser = async (accessToken,setAccessToken) => {
  const refreshToken = localStorage.getItem('refreshToken');

  await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Refresh-Token': refreshToken,
      'Content-Type': 'application/json',
    },
  });
  setAccessToken("");
  localStorage.clear();
  window.location.href = '/';
};
