import axios from "axios";
import { createContext, use, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

 export const userContext = createContext();

const UserProvider = ({children}) =>{
    const [user,setUser] = useState();
    const [userLoading,setUserLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation(); // <-- get current location

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserLoading(true);
                const response = await axios.get("http://localhost:3000/api/getUser", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    setUser(response.data.user);
                    setUserLoading(false);
                }
                // Only redirect if on landing page
                if (location.pathname === "/") {
                    navigate("/home");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }finally{
                setUserLoading(false);
            }
        };
        fetchUser();
    // Add location.pathname as dependency to keep it updated
    }, [location.pathname]);



    return (
    <userContext.Provider  value={{user,setUser,userLoading,setUserLoading}}>
    {children}
    </userContext.Provider>
 );
}


export {UserProvider}