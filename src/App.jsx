import React, { useEffect, useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Chat from './pages/Chat/Chat';
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { refresh } from './api/auth';
import { AppContext } from './context/AppContext';

const App = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(AppContext);
  

  useEffect(() => {
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
    
    const authenticateUser = async () => {
      const isAuthenticated = await refresh(setAccessToken);
      if (isAuthenticated.ok) {
        navigate('/chat');
      } else {
        navigate('/');
      }
    };

    authenticateUser();
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
