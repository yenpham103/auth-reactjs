import Logout from "../Auth/Logout";
import Profile from "./Profile";

export default function Dashboard({ onSuccess }) {
  return (
    <div className="container">
      <h2 className="text-center">Welcome to Dashboard</h2>
      <Logout onSuccess={onSuccess}>
        <button className="btn btn-danger btn-sm ">Logout</button>
      </Logout>
      <Profile onSuccess={onSuccess} />
    </div>
  );
}
