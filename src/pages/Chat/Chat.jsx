import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import { AppContext } from '../../context/AppContext';
import { connectWebSocket,disconnectWebSocket } from '../../api/Websocket';

const Chat = () => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);

  const { userData,accessToken } = useContext(AppContext);

  const onMessageReceived = (payload) => {

    const receivedMessage = JSON.parse(payload.body);
    console.log(receivedMessage,"AVAVVAVVVAVAVVAVAVVVAVVVAVVVAVVVVVAVAVV");
    
    if (receivedMessage.senderId === selectedUser?.id || receivedMessage.recipientId === userData?.id) {
      setChatMessage((prevMessages) => [...prevMessages, receivedMessage]);                         //   setChatMessage([...chatMessage,receivedMessage])
    }
  };
   

  useEffect(() => {
    console.log("^&^&^^&^&^&^&^&^&^");
    
    if(userData){
      console.log("********************");

      const client = connectWebSocket(userData.id,onMessageReceived,accessToken); 
      setStompClient(client); 
    }
    
    return () => {
      if (stompClient) {
        disconnectWebSocket(stompClient); 
      }
    };
  }, [userData,accessToken]);

  // useEffect(() => {
  //   // Initialize STOMP client
  //   const client = new Client({
  //     brokerURL: `ws://localhost:8080/ws`,
  //     connectHeaders: {
  //       Authorization: `Bearer ${token}`, // Pass JWT token
  //     },
  //     reconnectDelay: 5000, // Reconnect after 5 seconds
  //     onConnect: () => {
  //       console.log('Connected to WebSocket');
  //       client.subscribe(`/user/${userId}/queue`, onMessageReceived);
  //     },
  //     onStompError: (frame) => {
  //       console.error('STOMP Error:', frame);
  //     },
  //   });

  //   client.activate();
  //   setStompClient(client);

  //   return () => {
  //     if (client.connected) {
  //       client.deactivate();
  //       console.log('WebSocket Disconnected');
  //     }
  //   };
  // }, [userId, token]);

  // const onMessageReceived = (message) => {
  //   const receivedMessage = JSON.parse(message.body);
  //   setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  // };

  // const sendMessage = (content) => {
  //   if (stompClient && selectedUserId && content.trim() !== '') {
  //     const chatMessage = {
  //       senderId: userId,
  //       recipientId: selectedUserId,
  //       content,
  //       timestamp: new Date(),
  //     };

  //     stompClient.publish({
  //       destination: '/app/chat',
  //       body: JSON.stringify(chatMessage),
  //     });

  //     setMessages((prevMessages) => [...prevMessages, chatMessage]);
  //   }
  // };

  return (
    <div className='chat'>
      <div className="chat-container">
        {/* <LeftSidebar setSelectedUserId={setSelectedUserId} />
        <ChatBox messages={messages} sendMessage={sendMessage} />
        <RightSidebar /> */}
        <LeftSidebar  setSelectedUser={setSelectedUser} />
        <ChatBox  stompClient={stompClient} selectedUser={selectedUser} chatMessage={chatMessage} setChatMessage={setChatMessage} />
        <RightSidebar />
      </div>
    </div>
  );
};

export default Chat;
