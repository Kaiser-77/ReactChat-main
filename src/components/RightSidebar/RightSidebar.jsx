import React, { useContext } from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logoutUser } from '../../api/auth';
import { AppContext } from '../../context/AppContext';


const RightSidebar = () => {
  const {userData,accessToken,setAccessToken} = useContext(AppContext);
  
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={userData?.profilePic} alt={userData?.name || userData?.userName} />
        <h3>{userData?.name || userData?.userName} <img src={assets.green_dot} alt="" className="dot" /></h3>
        <p>Hey ther im {userData?.userName} </p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={()=>logoutUser(accessToken,setAccessToken)}>Logout</button>
    </div>
  )
}

export default RightSidebar
