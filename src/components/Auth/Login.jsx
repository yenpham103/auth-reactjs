import { useState } from "react";
import { requestLogin, saveToken } from "../utils/auth";
import { toast } from "react-toastify";

export default function Login({ onSuccess }) {
  const [form, setForm] = useState({
    email: "john@mail.com",
    password: "changeme",
  });
  const [status, setStatus] = useState("idle");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { email, password } = form;
      if (!email || !password) {
        return toast.info("All fields are required");
      }
      const response = await requestLogin(form);
      if (!response) {
        return toast.error("Login failed");
      }
      saveToken(response);
      onSuccess(response);
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("idle");
    }
  };
  return (
    <div className="w-50 m-auto py-3">
      <h2 className="text-center">Login</h2>
      <form action="" onSubmit={handleSubmitForm}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email..."
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password..."
            required
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
