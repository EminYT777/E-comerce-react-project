import axios from "axios";
import { createContext, useEffect } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    let navigate = UseNavigate();

    useEffect(() => {
        getUserAccount();
    }, []);

    function getUserAccount() {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            return;
        }

        axios
             .get(`${baseUrl}/auth/profile`, {
                headers: {Authorization: `Bearer ${token}`},
             })
             .then((response) => setUser(response.data))
             .catch((error) => {
                console.error('Error fething user profile:', error);
                localStorage.removeItem('token');
                setUser(null);
             });
    }

    function logoutUser() {
        const token = localStorage.getItem('token');
        if (token) {
            axios 
                .post(`${baseUrl}/auth/logout`, null, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    console.log('Logout successful!');
                    localStorage.removeItem('token');
                    setUser(null);
                    navigate("/");
                })
                .catch(error => {
                    console.error('Logout error:', error.response ? error.response.data : error.message);
                    localStorage.removeItem('token');
                    setUser(null);
                    navigate("/");
                });
        } else {
            console.log('No token found, user might already be logged out');
            setUser(null);
            navigate("/");
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, getUserAccount, logoutUser }}>
             {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;