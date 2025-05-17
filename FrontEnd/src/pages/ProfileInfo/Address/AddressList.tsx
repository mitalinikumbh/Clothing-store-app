import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Address } from "../../../models/Address";
import "./AddressList.css";

interface AddressListProps {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
  token: string;
}

const blankAddress: Address = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  mobile: "",
};

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  setAddresses,
  token,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newAddr, setNewAddr] = useState<Address>(blankAddress);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:5454/api/addresses/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data || []);
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    }
  };

  const saveUpdatedAddress = async (address: Address) => {
    if (!address.id) {
      alert("Missing address ID. Cannot update.");
      return;
    }
    await axios.put(
      `http://localhost:5454/api/addresses/update/${address.id}`,
      address,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const saveNewAddress = async () => {
    await axios.post("http://localhost:5454/api/addresses/add", newAddr, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    const updated = [...addresses];
    updated[index] = {
      ...updated[index],
      [field]: field === "mobile" || field === "streetAddress" ? value || null : value,
    };
    setAddresses(updated);
  };

  const handleAddressSave = async (addr: Address) => {
    try {
      await saveUpdatedAddress(addr);
      alert("Address updated!");
      setEditIndex(null);
      fetchAddresses();
    } catch (err) {
      console.error("Failed to update address:", err);
    }
  };

  const handleNewAddrChange = (field: keyof Address, value: string) => {
    setNewAddr({
      ...newAddr,
      [field]: field === "mobile" || field === "streetAddress" ? value || null : value,
    });
  };

  const handleAddAddress = async () => {
    if (!newAddr.streetAddress || !newAddr.city) {
      alert("Street address and city are required.");
      return;
    }
    try {
      await saveNewAddress();
      alert("Address added!");
      setNewAddr(blankAddress);
      setShowAddForm(false);
      fetchAddresses();
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const deleteAddress = async (id: number): Promise<boolean> => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this address?");
      if (!confirmDelete) return false;

      await axios.delete(`http://localhost:5454/api/addresses/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Address deleted:", id);
      return true;
    } catch (error) {
      console.error("Failed to delete address:", error);
      alert("Failed to delete address. Please try again.");
      return false;
    }
  };

  return (
    <div className="card p-4 mb-4 address-list-container">
      <h4 className="address-header">My Addresses</h4>

      <div className="add-address-btn-container mb-3">
        <button
          className="btn add-address-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "×" : "+ Add Address"}
        </button>
      </div>

      {showAddForm ? (
        <div className="address-card mb-4">
          <input className="form-control mb-2" placeholder="First Name" value={newAddr.firstName} onChange={(e) => handleNewAddrChange("firstName", e.target.value)} />
          <input className="form-control mb-2" placeholder="Last Name" value={newAddr.lastName} onChange={(e) => handleNewAddrChange("lastName", e.target.value)} />
          <input className="form-control mb-2" placeholder="Mobile" value={newAddr.mobile ?? ""} onChange={(e) => handleNewAddrChange("mobile", e.target.value)} />
          <input className="form-control mb-2" placeholder="Street Address" value={newAddr.streetAddress ?? ""} onChange={(e) => handleNewAddrChange("streetAddress", e.target.value)} />
          <input className="form-control mb-2" placeholder="City" value={newAddr.city} onChange={(e) => handleNewAddrChange("city", e.target.value)} />
          <input className="form-control mb-2" placeholder="State" value={newAddr.state} onChange={(e) => handleNewAddrChange("state", e.target.value)} />
          <input className="form-control mb-3" placeholder="Zip Code" value={newAddr.zipCode} onChange={(e) => handleNewAddrChange("zipCode", e.target.value)} />
          <div className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleAddAddress}>Save</button>
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Close</button>
          </div>
        </div>
      ) : (
        addresses.length === 0 ? (
          <p>No addresses found.</p>
        ) : (
          addresses.map((addr, idx) => (
            <div key={addr.id ?? idx} className="address-card">
              {editIndex === idx ? (
                <>
                  <input className="form-control mb-2" placeholder="First Name" value={addr.firstName} onChange={(e) => handleAddressChange(idx, "firstName", e.target.value)} />
                  <input className="form-control mb-2" placeholder="Last Name" value={addr.lastName} onChange={(e) => handleAddressChange(idx, "lastName", e.target.value)} />
                  <input className="form-control mb-2" placeholder="Mobile" value={addr.mobile ?? ""} onChange={(e) => handleAddressChange(idx, "mobile", e.target.value)} />
                  <input className="form-control mb-2" placeholder="Street Address" value={addr.streetAddress ?? ""} onChange={(e) => handleAddressChange(idx, "streetAddress", e.target.value)} />
                  <input className="form-control mb-2" placeholder="City" value={addr.city} onChange={(e) => handleAddressChange(idx, "city", e.target.value)} />
                  <input className="form-control mb-2" placeholder="State" value={addr.state} onChange={(e) => handleAddressChange(idx, "state", e.target.value)} />
                  <input className="form-control mb-3" placeholder="Zip Code" value={addr.zipCode} onChange={(e) => handleAddressChange(idx, "zipCode", e.target.value)} />
                  <button className="btn btn-success me-2" onClick={() => handleAddressSave(addr)}>Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p><strong>Name:</strong> {addr.firstName} {addr.lastName}</p>
                  <p><strong>Street:</strong> {addr.streetAddress ?? "N/A"}</p>
                  <p><strong>City:</strong> {addr.city}</p>
                  <p><strong>State:</strong> {addr.state}</p>
                  <p><strong>Zip:</strong> {addr.zipCode}</p>
                  <p><strong>Mobile:</strong> {addr.mobile ?? "N/A"}</p>
                  <div className="address-actions">
                    <button className="btn btn-outline-primary me-2" onClick={() => setEditIndex(idx)}>Edit Address</button>
                    <button className="btn btn-outline-danger" onClick={async () => {
                      if (addr.id) {
                        const success = await deleteAddress(addr.id);
                        if (success) fetchAddresses();
                      }
                    }}>Delete Address</button>
                  </div>
                </>
              )}
            </div>
          ))
        )
      )}
    </div>
  );
};

export default AddressList;
