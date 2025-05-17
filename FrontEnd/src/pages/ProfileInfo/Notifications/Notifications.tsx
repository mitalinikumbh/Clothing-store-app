import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notifications = () => {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [showSmsPrompt, setShowSmsPrompt] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Load from localStorage
  useEffect(() => {
    const email = localStorage.getItem("emailNotifications");
    const sms = localStorage.getItem("smsNotifications");
    if (email !== null) setEmailEnabled(email === "true");
    if (sms !== null) setSmsEnabled(sms === "true");
  }, []);

  // Show sample notification only if both are enabled
  useEffect(() => {
    if (emailEnabled || smsEnabled) {
      const timer = setTimeout(() => {
        setNotificationMessage("🎉 You have a new offer via Email/SMS!");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setNotificationMessage("");
    }
  }, [emailEnabled, smsEnabled]);

  // Toggle handlers
  const handleEmailToggle = () => {
    if (emailEnabled) setShowEmailPrompt(true);
    else {
      setEmailEnabled(true);
      localStorage.setItem("emailNotifications", "true");
    }
  };

  const handleSmsToggle = () => {
    if (smsEnabled) setShowSmsPrompt(true);
    else {
      setSmsEnabled(true);
      localStorage.setItem("smsNotifications", "true");
    }
  };

  const confirmDisableEmail = () => {
    setEmailEnabled(false);
    localStorage.setItem("emailNotifications", "false");
    setShowEmailPrompt(false);
  };

  const confirmDisableSms = () => {
    setSmsEnabled(false);
    localStorage.setItem("smsNotifications", "false");
    setShowSmsPrompt(false);
  };

  const cancelPrompt = () => {
    setShowEmailPrompt(false);
    setShowSmsPrompt(false);
  };

  return (
    <div className="notif-container">
      <h2>Notification Settings</h2>

      <div className="inline-toggle">
        <span>Email Notifications: {emailEnabled ? "ON" : "OFF"}</span>
        <label className="switch">
          <input type="checkbox" checked={emailEnabled} onChange={handleEmailToggle} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="inline-toggle">
        <span>SMS Notifications: {smsEnabled ? "ON" : "OFF"}</span>
        <label className="switch">
          <input type="checkbox" checked={smsEnabled} onChange={handleSmsToggle} />
          <span className="slider"></span>
        </label>
      </div>

      {notificationMessage && (
        <div className="notif-message">{notificationMessage}</div>
      )}

      {/* Confirmation Modal for Email */}
      {showEmailPrompt && (
        <div className="notif-modal-overlay">
          <div className="notif-modal">
            <p>Are you sure you want to turn off Email notifications?</p>
            <div className="notif-modal-buttons">
              <button className="btn-confirm" onClick={confirmDisableEmail}>Yes</button>
              <button className="btn-cancel" onClick={cancelPrompt}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for SMS */}
      {showSmsPrompt && (
        <div className="notif-modal-overlay">
          <div className="notif-modal">
            <p>Are you sure you want to turn off SMS notifications?</p>
            <div className="notif-modal-buttons">
              <button className="btn-confirm" onClick={confirmDisableSms}>Yes</button>
              <button className="btn-cancel" onClick={cancelPrompt}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
