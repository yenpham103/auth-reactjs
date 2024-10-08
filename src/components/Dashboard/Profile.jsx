import { useEffect, useState } from "react";
import { getUsers, logout } from "../utils/auth";
import Logout from "../Auth/Logout";

export default function Profile({ onSuccess }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const user = await getUsers();
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        // Refresh Token
        // Call Api logout
        logout();
        onSuccess(true);
      }
    }
    fetchData();
  }, [onSuccess]);
  return (
    <div className="w-50 mx-auto">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul className="list-group d-flex list-unstyled gap-2 justify-content-center">
          <img src={user.avatar} className="w-25" alt="" />
          <li>Hello: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Role: {user.role}</li>
          <Logout onSuccess={onSuccess}>
            <button className="btn btn-danger btn-sm ">Logout</button>
          </Logout>
        </ul>
      )}
    </div>
  );
}
