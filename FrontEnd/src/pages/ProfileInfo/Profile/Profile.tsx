import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import AddressList from "../Address/AddressList";
import Notifications from "../Notifications/Notifications";
import "./Profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5454/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setForm({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        mobile: res.data.mobile,
      });
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5454/api/users/profile-edit",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card row no-gutters">
        {/* Sidebar */}
        <div className="col-md-3 profile-sidebar">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === "profile" ? "active" : ""
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === "addresses" ? "active" : ""
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              My Addresses
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              My Orders
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === "notifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === "settings" ? "active" : ""
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
            <button
              className={`list-group-item list-group-item-action ${
                activeTab === "password" ? "active" : ""
              }`}
              onClick={() => setActiveTab("password")}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-md-9 profile-content">
          {activeTab === "profile" && (
            <ProfileInfo
              user={user}
              form={form}
              editMode={editMode}
              setEditMode={setEditMode}
              handleChange={handleChange}
              handleSave={handleSave}
            />
          )}
          {activeTab === "addresses" && (
            <AddressList
              addresses={addresses}
              setAddresses={setAddresses}
              token={token || ""}
            />
          )}
          {activeTab === "orders" && (
            <div>
              <h4>My Orders</h4>
              <p>Order history will appear here soon.</p>
            </div>
          )}
          {activeTab === "notifications" && <Notifications />}
          {activeTab === "settings" && (
            <div>
              <h4>Settings</h4>
              <p>Settings options will be available here soon.</p>
            </div>
          )}
          {activeTab === "password" && (
            <p>Change Password feature coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
