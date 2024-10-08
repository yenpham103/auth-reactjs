import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/Login";
import { getToken } from "./components/utils/auth";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const checkAuth = () => {
    const token = getToken();
    if (token) {
      setIsAuth(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuth(true);
  };
  const handleLogoutSuccess = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      {isAuth ? (
        <Dashboard onSuccess={handleLogoutSuccess} />
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
      <ToastContainer />
    </div>
  );
}
