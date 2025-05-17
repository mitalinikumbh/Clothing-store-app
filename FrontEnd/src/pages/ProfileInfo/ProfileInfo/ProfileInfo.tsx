// src/components/Profile/ProfileInfo.tsx
import React from "react";
import "./ProfileInfo.css";

const ProfileInfo = ({ form, handleChange, editMode, setEditMode, handleSave, user }: any) => {
  return (
    <div className="profile-info-container">
      <h4>Profile Details</h4>
      {editMode ? (
        <>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                className="form-control"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                className="form-control"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              name="mobile"
              className="form-control"
              value={form.mobile}
              onChange={handleChange}
            />
          </div>
          <div className="btn-group">
            <button className="btn btn-success" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <button className="btn btn-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
