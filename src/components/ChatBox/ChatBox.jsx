import React, { useEffect, useState, useContext, useRef } from 'react';
import './ChatBox.css';
import assets from '../../assets/assets';
import { sendMessage } from '../../api/Websocket';

import { AppContext } from '../../context/AppContext'
import { getChatMessages } from '../../api/chat';


const ChatBox = ({stompClient,selectedUser,chatMessage,setChatMessage}) => {

  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const [message, setMessage] = useState('');
  const { userData,accessToken } = useContext(AppContext);


  useEffect(()=>{
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({ behavior: "instant" });
    }
  },[chatMessage])

  
  useEffect(() => {
   
    if (selectedUser) {
        getChatMessages(userData?.id, selectedUser?.id, accessToken)
            .then(chatMsg => {
                setChatMessage(chatMsg);
                console.log(chatMsg); // Logging after setting state
            })
            .catch(error => console.error("Error fetching messages:", error));
    }
}, [selectedUser]);

 

  const handleSendMessage = (event) => {
    
    event.preventDefault();
    if (message.trim()){
      const newChatMessage = {
        senderId: userData.id,
        recipientId: selectedUser.id,
        content: message.trim(),
        timestamp: new Date(),
      };
      sendMessage(newChatMessage,stompClient,accessToken);
      setChatMessage([...chatMessage,newChatMessage]);
      setMessage('');

    }

  };

  return (
    <div className='chat-box'>
      <div className='chat-user'>
        <img src={selectedUser?.profilePic } alt={selectedUser?.name || selectedUser?.userName} />
        <p>{selectedUser?.name || selectedUser?.userName} <img src={assets.green_dot} className='dot' /></p>
        <img src={assets.help_icon} alt='' />
      </div>

      <div className='chat-msg' ref={chatContainerRef}>

        {(selectedUser && chatMessage.length > 0)
          ? chatMessage.map((msg, index) => { 
              const isSender = msg.senderId === userData.id;
              const profilePic = isSender ? userData.profilePic : selectedUser.profilePic;
              const userName = isSender ? userData.userName : selectedUser.userName;
            return(
            
            <div key={index} className={isSender ? 's-msg' : 'r-msg'}>
              <p className='msg'>{msg.content} </p>
              <div>
                {/* <img src={msg.senderId === userData.id ? userData.profilePic : selectedUser.profilePic} alt={msg.senderId === userData.id ? userData.userName.charAt(0).toUpperCase() : selectedUser.userName.charAt(0).toUpperCase()} /> */}
                { profilePic && false
                ? (<img src={profilePic} alt={userName} /> ) 
                : ( <div className="avatar">{userName.charAt(0).toUpperCase()}</div> )
                }
                <p>{new Date(msg.timestamp).toLocaleTimeString()}</p>
              </div>
            </div>
            )})
        : null }
        <div ref={bottomRef}></div>
      </div>

      <div className='chat-input'>
        <input
          type='text'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage(e)}
        />
        <input type='file' id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor='image'>
          <img src={assets.gallery_icon} alt='' />
        </label>
        <img src={assets.send_button} alt='' onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatBox;
