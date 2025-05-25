import { useEffect, useState } from "react";
import { AuthContext } from ".";
import { authenticateUser } from "../api/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "sonner"; // Optional: add toast for error handling

const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null); //
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const validateUser = async () => {
      if (token) {
        try {
          const res = await authenticateUser(token);
          setUser(res.data.user); // Adjust to match your API response
        } catch (error) {
          console.error("Token invalid or expired");
          toast.error("Session expired. Please log in again."); // Optional: Notify the user
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    validateUser();
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {loading ? null : children}{" "}
      {/* Optionally, don't render children while loading */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
