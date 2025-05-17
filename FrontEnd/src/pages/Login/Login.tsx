// src/pages/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5454/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("✅ Login successful!");
      navigate("/");
    } catch (err: any) {
      alert("❌ " + (err.response?.data || "Login failed"));
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg rounded-4 overflow-hidden" style={{ width: "90%", maxWidth: "900px" }}>
        {/* Left Side: Image and Text */}
        <div className="col-md-6 d-none d-md-flex bg-primary text-white flex-column justify-content-center align-items-center p-4">
          <img
            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
            alt="Login Visual"
            className="img-fluid mb-4"
            style={{ maxHeight: "200px" }}
          />
          <h3 className="text-center fw-bold">Welcome Back!</h3>
          <p className="text-center">Log in to continue enjoying your journey with us.</p>
        </div>

        {/* Right Side: Login Form */}
        <div className="col-12 col-md-6 bg-white p-4">
          <h2 className="text-center text-primary mb-3">Sign In</h2>
          <p className="text-center text-muted">
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          <p className="text-center text-muted mt-4 small">
            By logging in, I agree to receive emails from JustOrder.
          </p>
          <footer className="text-center text-muted small mt-3">
            © 2024 JustOrder. All rights reserved.{" "}
            <Link to="/terms" className="text-decoration-none">Terms</Link> •{" "}
            <Link to="/privacy" className="text-decoration-none">Privacy</Link>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
