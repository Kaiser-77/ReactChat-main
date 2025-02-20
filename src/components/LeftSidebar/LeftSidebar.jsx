import React, { useEffect, useState, useContext } from 'react';
import './LeftSidebar.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../api/profile';
import { getChatList, searchUser } from '../../api/chat';
import { logoutUser } from '../../api/auth';

import { AppContext } from '../../context/AppContext'


const LeftSidebar = ({setSelectedUser}) => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const { userData,accessToken } = useContext(AppContext);
  

  useEffect(() => {
    const fetchChatRooms = async () => {
      const chatList = await getChatList(accessToken);
      setChatRooms(chatList.profileDtoList);
    }
    if(userData){
      fetchChatRooms();
    }    
  },[userData]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const profile = await getProfile();
  //       setUserData(profile);
  //     } catch (error) {
  //       console.error('Error fetching profile:', error);
  //       navigate('/');
  //     }
  //   };

  //   const fetchChats = async () => {
  //     try {
  //       const chats = await getChatList();
  //       setChatData(chats);
  //     } catch (error) {
  //       console.error('Error fetching chat list:', error);
  //     }
  //   };

  //   fetchUserData();
  //   fetchChats();
  // }, [navigate]);

  // useEffect(() => {
  //   const client = connectWebSocket((message) => {
  //     setChatData((prevChats) => {
  //       return prevChats.map((chat) =>
  //         chat.userId === message.senderId
  //           ? { ...chat, lastMessage: message.content }
  //           : chat
  //       );
  //     });
  //   });

  //   return () => client.deactivate();
  // }, []);

  const inputHandler = async (e) => {
    const input = e.target.value.trim();
    if (input) {
      setShowSearch(true);
      try {
        const users = await searchUser(input,accessToken);
        setSearchResults(users.profileDtoList);
      } catch (error) {
        console.error('Error searching user:', error);
      }
    } else {
      setShowSearch(false);
      setSearchResults([]);
    }
  };

  const handleAddChat = async (user) => {
    // try {
    //   await createChat(user.id);
    //   const chats = await getChatList(); // Refresh chat list
    //   setChatData(chats);
    // } catch (error) {
    //   console.error('Error creating chat:', error);
    // }
  };

  return (
    <div className='ls'>
      <div className='ls-top'>
        <div className='ls-nav'>
          <img src={assets.logo} className='logo' alt='logo' />
          <div className='menu'>
            <img src={assets.menu_icon} alt='' />
            <div className='sub-menu'>
              <p onClick={() => navigate('/profile')}>Edit profile</p>
              <hr />
              <p onClick={logoutUser}>Logout</p>
            </div>
          </div>
        </div>
        <div className='ls-search'>
          <img src={assets.search_icon} alt='' />
          <input onChange={inputHandler} type='text' placeholder='Search here...' />
        </div>
      </div>
      <div className='ls-list'>
        {showSearch && searchResults.length > 0 ? (
          searchResults.map((user, index) => (
            <div key={index} onClick={() => handleAddChat(user)} className='friends add-user'>
              <img src={user.profilePic || assets.profile_img} alt='' />
              <p>{user.userName}</p>
            </div>
          ))
        ) : chatRooms.length > 0 ? (
          chatRooms.map((chatUser, index) => (
            <div key={index} onClick={() => setSelectedUser(chatUser)} className='friends'>
              <img src={chatUser.profilePic || assets.profile_img} alt='' />
              <div>
                <p>{chatUser.userName}</p>
                <span>chatUser.lastMessage</span>
              </div>
            </div>
          ))
        ) : (
          <p>No chats available</p>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
