// import { Client, Stomp } from '@stomp/stompjs';
// import SockJS from "sockjs-client";

export const connectWebSocket = (userId,onMessageReceived,accessToken) => {

  if (!userId) {
    console.log(".....no userId");

    return;
  }
 
  const socket = new SockJS(`http://localhost:8080/ws?token=${accessToken}`);
  // const client = new Client({
  //   webSocketFactory: () => socket,
  //   connectHeaders: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   reconnectDelay: 5000, // Automatically reconnect after 5s
  //   debug: (str) => console.log("STOMP Debug:", str),
  //   onConnect: () => {
  //     console.log("✅ Connected to WebSocket");
  //     client.subscribe(`/user/${userId}/queue`, onMessageReceived);
  //     client.subscribe(`/topic/public`, onMessageReceived);
  //   },
  //   onStompError: (frame) => {
  //     console.error("❌ STOMP Error:", frame.headers["message"]);
  //   },
  //   onWebSocketError: (error) => {
  //     console.error("❌ WebSocket Error:", error);
  //   },
  //   onWebSocketClose: () => {
  //     console.warn("🔴 WebSocket Closed");
  //   },
  // });
  
  // client.activate();

  const stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    console.log("Connected to WebSocket server!");
    stompClient.subscribe(`/user/${userId}/queue`, onMessageReceived);
    stompClient.subscribe(`/topic/public`, onMessageReceived);
}, (error) => {
    console.error("Connection error:", error);
});

  console.log("🟢 WebSocket activation called");
  
  return stompClient;
};


export const disconnectWebSocket = (client) => {  
  console.log("Cleaning up WebSocket connection...");
  client.deactivate();
};



export const sendMessage = (newChatMessage,client,accessToken) => {
  console.log(client,"__________________________________________");
  
  if (client && client.connected) {  
    client.send("/app/chat", {}, JSON.stringify(newChatMessage));
    // client.publish({
    //   destination: "/app/chat",
    //   body: JSON.stringify(newChatMessage),
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
  } else {
    console.error("WebSocket is not connected. Cannot send message.");
  }
};

// headers: {
//   Authorization: `Bearer ${accessToken}`,  // Include the JWT token
// }