
const API_BASE_URL = 'http://localhost:8080';


export const getChatList = async (accessToken) => {
  const response = await fetch(`${API_BASE_URL}/chatList`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chat list');
  }
  return await response.json();
};

export const searchUser = async (query,accessToken) => {
  const response = await fetch(`${API_BASE_URL}/search/user?name=${query}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('User search failed');
  }
  return await response.json();
};

export const getChatMessages = async (senderId,recipientId,accessToken) => {
  const response = await fetch(`${API_BASE_URL}/messages/${senderId}/${recipientId}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('chat message search failed');
  }
  return await response.json();
};

