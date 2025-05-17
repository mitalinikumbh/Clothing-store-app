import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile: "",
    password: "",
    role: "CUSTOMER",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      email: "",
      first_name: "",
      last_name: "",
      mobile: "",
      password: "",
      role: "CUSTOMER",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5454/api/auth/register", formData);
      toast.success("✅ Registered successfully. Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.warn("⚠️ This email is already registered. Try logging in.");
      } else {
        toast.error("❌ " + (err.response?.data || "Registration failed"));
      }
      resetForm(); // 🔁 Clear form fields on error
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <ToastContainer position="top-center" autoClose={2500} />
      <div className="col-md-6 col-lg-5 shadow rounded-4 bg-white p-4">
        <h3 className="text-center text-primary mb-2">Create Account</h3>
        <p className="text-center text-muted mb-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>
        </form>

        {/* Social login */}
        <div className="text-center text-muted mb-2">or sign up with</div>
        <div className="d-flex gap-2 justify-content-center mb-3">
          <button
            className="btn btn-outline-danger w-50"
            onClick={() => toast.info("🔐 Google OAuth coming soon")}
          >
            <FaGoogle className="me-2" /> Google
          </button>
          <button
            className="btn btn-outline-primary w-50"
            onClick={() => toast.info("🔐 Facebook OAuth coming soon")}
          >
            <FaFacebookF className="me-2" /> Facebook
          </button>
        </div>

        <footer className="text-center text-muted small">
          © 2024 JustOrder. All rights reserved. <br />
          <Link to="/terms" className="text-decoration-none">Terms</Link> •{" "}
          <Link to="/privacy" className="text-decoration-none">Privacy</Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;
