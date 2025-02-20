
const API_BASE_URL = 'http://localhost:8080';


export const getProfile = async (accessToken) => {
  if (!accessToken) throw new Error('No token found');

  const response = await fetch(`${API_BASE_URL}/myProfile`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return await response.json();
};

export const getProfileById = async (userId,accessToken) => {
  if (!accessToken) throw new Error('No token found');

  const response = await fetch(`${API_BASE_URL}/getProfile/${userId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return await response.json();
};

export const updateProfile = async (formData,accessToken) => {
  const response = await fetch(`${API_BASE_URL}/updateProfile`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }
  return await response.json();
};
