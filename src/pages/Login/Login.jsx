import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './Login.css';
import assets from '../../assets/assets';
import { registerUser, loginUser } from '../../api/auth';

const Login = () => {
  const [currState, setCurrState] = useState("Login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData,accessToken,setAccessToken } = useContext(AppContext);
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currState === 'Sign up') {
        await registerUser(username, email, password);
        alert('To complete register, click the link send to your mail before login.');
        setCurrState('Login');
      } else {
        const tokens = await loginUser(email, password,setAccessToken);
        setAccessToken(tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        // window.location.href = '/chat';
      }
    } catch (error) {
      alert(error.message || 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="logo_big" className="logo" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign up" && (
          <input 
            type="text" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username} 
            placeholder='Username' 
            className="form-input" 
            required
          />
        )}
        <input 
          type="text" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
          placeholder='Email address' 
          className="form-input" 
          required
        />
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          placeholder='Password' 
          className="form-input" 
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? "Processing..." : currState === "Sign up" ? "Create account" : "Login now"}
        </button>
        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          ) : (
            <p className="login-toggle">Create an account <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
