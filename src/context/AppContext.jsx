import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../api/profile";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    

    // useEffect(()=>{
    //     if(accessToken){
    //         localStorage.setItem("accessToken",accessToken);
    //     } else {
    //         localStorage.removeItem("accessToken");
    //     }
    // },[accessToken])
    

    

    useEffect(()=>{
        const fetchUserData = async () => {

            try {
                const user = await getProfile(accessToken);
                console.log("(context-useEffect) User Data:", user);
    
                if (!user) {
                    console.error("User not found, redirecting to login.");
                    navigate("/");
                    return;
                }
    
                setUserData(user);
    
                if (user.name) {
                    navigate("/chat");
                } else {
                    navigate("/chat"); // profilupdate page
                }
    
               
            } catch (error) {
                console.log("Error loading user data:", error);
                navigate("/");
            }
        };
        fetchUserData();
    },[accessToken])


    // useEffect(() => {
    //     if (userData) {
    //         const fetchChats = async () => {
    //             try {
    //                 const chats = await getUserChats(userData.id);
    //                 setChatData(chats);
    //             } catch (error) {
    //                 console.error("Error fetching chats:", error);
    //             }
    //         };

    //         fetchChats();
    //         const interval = setInterval(fetchChats, 10000); // Polling every 10 seconds

    //         return () => clearInterval(interval);
    //     }
    // }, [userData]);

    const value = {
        userData,setUserData,
        accessToken,setAccessToken
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider