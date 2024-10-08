import { toast } from "react-toastify";
import { removeToken } from "../utils/auth";

export default function Logout({ children, onSuccess }) {
  const handleLogout = () => {
    toast.warning("Logout successful");
    removeToken();
    onSuccess(true);
  };
  return <div onClick={handleLogout}>{children}</div>;
}
