import { createContext, useState } from "react";
import axios from "axios";

// Create context object
export const loginContext = createContext();

function LoginProvider({ children }) {
    const [currentUserDetails, setCurrentUserDetails] = useState({
        userLoginStatus: false,
        currentUser: {},
        err: "",
    });

    // Function to handle user login
    async function loginUser(credObj) {
        try {
            const res = await axios.post("https://fullstack-todo-list-yt-backend-2.onrender.com/user-api/login", credObj);

            if (res.data.message === "login success") {
                // Navigate to user profile
                sessionStorage.setItem("token", res.data.token);

                setCurrentUserDetails(prevState => ({
                    ...prevState,
                    currentUser: res.data.user,
                    userLoginStatus: true,
                    err: "",
                }));
            } else {
                setCurrentUserDetails(prevState => ({
                    ...prevState,
                    err: res.data.message,
                    userLoginStatus: false,
                    currentUser: {},
                }));
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            setCurrentUserDetails(prevState => ({
                ...prevState,
                err: "An error occurred during login.",
                userLoginStatus: false,
                currentUser: {},
            }));
        }
    }

    return (
        <loginContext.Provider value={{ currentUserDetails, setCurrentUserDetails, loginUser }}>
            {children}
        </loginContext.Provider>
    );
}

export default LoginProvider;