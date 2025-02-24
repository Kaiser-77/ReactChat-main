import React, { useContext, useEffect, useState } from 'react';
import './ProfileUpdate.css';
import assets from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../api/profile';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [prevImage, setPrevImage] = useState('');

  const {accessToken,setUserData} = useContext(AppContext);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile(accessToken);
        setName(profile.name);
        setBio(profile.bio);
        setPrevImage(profile.avatar);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/');
      }
    };

    fetchProfile();
  }, [navigate]);

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      if (image) {
        console.log("bussssssssssssssssssssssssss");
        
        formData.append('profilePic', image);
      } else{
        formData.append('age', 21);
        formData.append('profilePic', 'no inmg');
      }

      const updatedProfile = await updateProfile(formData,accessToken);
      setUserData(updatedProfile);
      navigate('/chat');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='profile'>
      <div className='profile-container'>
        <form onSubmit={profileUpdate} method='POST'>
          <h3>Profile Details</h3>
          <label htmlFor='avatar'>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : prevImage || assets.avatar_icon}
              alt='Profile'
            />
            Upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            placeholder='Your name'
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder='Write profile bio'
            required
          ></textarea>
          <button type='submit'>Save</button>
        </form>
        <img
          className='profile-pic'
          src={image ? URL.createObjectURL(image) : prevImage || assets.logo_icon}
          alt='Profile'
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;
