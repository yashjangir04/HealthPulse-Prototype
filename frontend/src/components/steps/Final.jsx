import React from "react";

const Final = ({ formData }) => {

  return (

    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        Review Information
      </h2>

      <div>
        <strong>Name:</strong> {formData.name}
      </div>

      <div>
        <strong>Email:</strong> {formData.email}
      </div>

      <div>
        <strong>Phone:</strong> {formData.phoneNumber}
      </div>

      <div>
        <strong>Specialization:</strong> {formData.specialization}
      </div>

      <div>
        <strong>Qualification:</strong> {formData.qualification}
      </div>

      <div>
        <strong>University:</strong> {formData.university}
      </div>

      <div>
        <strong>Address:</strong>
        <p>{formData.address.fullAddress}</p>
        <p>
          {formData.address.city}, {formData.address.state}
        </p>
        <p>{formData.address.pincode}</p>
      </div>

    </div>

  );
};

export default Final;