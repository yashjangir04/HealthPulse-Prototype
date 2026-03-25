import React from "react";

const EmergencyContact = ({ formData, setFormData }) => {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      secondaryContacts: [
        {
          ...formData.secondaryContacts[0],
          [name]: value
        }
      ]
    });
  };

  return (
    <div className="flex flex-col gap-4 min-h-[260px]">

      <input
        name="name"
        placeholder="Emergency Contact Name"
        value={formData.secondaryContacts[0].name}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg"
      />

      <input
        name="phoneNumber"
        placeholder="Emergency Contact Phone"
        value={formData.secondaryContacts[0].phoneNumber}
        onChange={handleChange}
        className="border border-gray-300 p-3 rounded-lg"
      />

    </div>
  );
};

export default EmergencyContact;