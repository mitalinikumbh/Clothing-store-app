import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get("http://localhost:5454/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User profile:", res.data);
        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg glass-navbar px-4 py-3">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="/">JustOrder</Link>
        <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 d-flex justify-content-end align-items-center gap-4">
            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
  <div className="d-flex align-items-center gap-1">
    <Link to="/categories" className="nav-link text-white fs-5">
      Shop
    </Link>
    <span
      className="nav-link dropdown-toggle text-white fs-5"
      role="button"
      data-bs-toggle="dropdown"
    ></span>
  </div>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to="/category/men">Men</Link></li>
    <li><Link className="dropdown-item" to="/category/women">Women</Link></li>
  </ul>
</li>

            <li className="nav-item">
              <Link className="nav-link text-white fs-5" to="/cart">
                <FaShoppingCart size={22} />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle text-white fs-5" role="button" data-bs-toggle="dropdown">
                <FaUserCircle size={22} /> {user ? `Hi, ${user.firstName}` : ""}
              </span>
              <ul className="dropdown-menu">
                {!user ? (
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                ) : (
                  <>
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
