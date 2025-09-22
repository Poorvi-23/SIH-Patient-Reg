// src/components/PatientForm.js
import React, { useState } from "react";
import axios from "axios";
import "./PatientForm.css"; // import the CSS file

const PatientForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "Male",
    dob: "",
    contact_number: "",
    email: "",
    address: "",
    allergies: "",
    height_cm: "",
    weight_kg: "",
    bp_systolic: "",
    bp_diastolic: "",
    blood_sugar_fasting: "",
    blood_sugar_pp: "",
    cholesterol: "",
    other_conditions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare patient data
      const patientData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        dob: formData.dob,
        contact_number: formData.contact_number,
        email: formData.email,
        address: formData.address,
        allergies: formData.allergies,
      };

      // Send patient details to backend
      const patientResponse = await axios.post(
        "http://127.0.0.1:8000/patients",
        patientData
      );

      const patient_id = patientResponse.data.patient_id;

      // Prepare medical details
      const medicalData = {
        patient_id,
        height_cm: parseFloat(formData.height_cm),
        weight_kg: parseFloat(formData.weight_kg),
        bp_systolic: formData.bp_systolic ? parseInt(formData.bp_systolic) : null,
        bp_diastolic: formData.bp_diastolic ? parseInt(formData.bp_diastolic) : null,
        blood_sugar_fasting: formData.blood_sugar_fasting ? parseFloat(formData.blood_sugar_fasting) : null,
        blood_sugar_pp: formData.blood_sugar_pp ? parseFloat(formData.blood_sugar_pp) : null,
        cholesterol: formData.cholesterol ? parseFloat(formData.cholesterol) : null,
        other_conditions: formData.other_conditions,
      };

      // Send medical details to backend
      const medicalResponse = await axios.post(
        "http://127.0.0.1:8000/medical",
        medicalData
      );

      alert(`Patient saved! BMI: ${medicalResponse.data.bmi}`);
      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        gender: "Male",
        dob: "",
        contact_number: "",
        email: "",
        address: "",
        allergies: "",
        height_cm: "",
        weight_kg: "",
        bp_systolic: "",
        bp_diastolic: "",
        blood_sugar_fasting: "",
        blood_sugar_pp: "",
        cholesterol: "",
        other_conditions: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error saving patient details.");
    }
  };

  return (
    <div className="pf-page">
      <div className="pf-header">
        <h2>Patient Registration</h2>
        <p className="pf-sub">Add patient information and medical details</p>
      </div>

      <form className="pf-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Left: Patient Details */}
          <div className="card patient-card">
            <h3 className="card-title">Patient Details</h3>

            <label className="field">
              <span>First Name *</span>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="input"
              />
            </label>

            <label className="field">
              <span>Last Name</span>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="input"
              />
            </label>

            <label className="field">
              <span>Gender</span>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="field">
              <span>Date of Birth *</span>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="input"
              />
            </label>

            <label className="field">
              <span>Contact Number</span>
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
                className="input"
              />
            </label>

            <label className="field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input"
              />
            </label>

            <label className="field">
              <span>Address</span>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="input"
              />
            </label>

           
          </div>

          {/* Right: Medical Details */}
          <div className="card medical-card">
            <h3 className="card-title">Medical Details</h3>

            <label className="field">
              <span>Height (cm) *</span>
              <input
                type="number"
                name="height_cm"
                placeholder="Height (cm)"
                value={formData.height_cm}
                onChange={handleChange}
                required
                className="input"
                step="0.1"
              />
            </label>

            <label className="field">
              <span>Weight (kg) *</span>
              <input
                type="number"
                name="weight_kg"
                placeholder="Weight (kg)"
                value={formData.weight_kg}
                onChange={handleChange}
                required
                className="input"
                step="0.1"
              />
            </label>

            <div className="two-cols">
              <label className="field small">
                <span>BP Systolic</span>
                <input
                  type="number"
                  name="bp_systolic"
                  placeholder="e.g. 120"
                  value={formData.bp_systolic}
                  onChange={handleChange}
                  className="input"
                />
              </label>

              <label className="field small">
                <span>BP Diastolic</span>
                <input
                  type="number"
                  name="bp_diastolic"
                  placeholder="e.g. 80"
                  value={formData.bp_diastolic}
                  onChange={handleChange}
                  className="input"
                />
              </label>
            </div>

            <div className="two-cols">
              <label className="field small">
                <span>Fasting Sugar</span>
                <input
                  type="number"
                  name="blood_sugar_fasting"
                  placeholder="mg/dL"
                  value={formData.blood_sugar_fasting}
                  onChange={handleChange}
                  className="input"
                  step="0.1"
                />
              </label>

              <label className="field small">
                <span>Postprandial Sugar</span>
                <input
                  type="number"
                  name="blood_sugar_pp"
                  placeholder="mg/dL"
                  value={formData.blood_sugar_pp}
                  onChange={handleChange}
                  className="input"
                  step="0.1"
                />
              </label>
            </div>

            <label className="field">
              <span>Cholesterol</span>
              <input
                type="number"
                name="cholesterol"
                placeholder="mg/dL"
                value={formData.cholesterol}
                onChange={handleChange}
                className="input"
                step="0.1"
              />
            </label>

            <label className="field">
              <span>Other Conditions</span>
              <input
                type="text"
                name="other_conditions"
                placeholder="e.g. Asthma"
                value={formData.other_conditions}
                onChange={handleChange}
                className="input"
              />
            </label>
             <label className="field">
              <span>Allergies</span>
              <input
                type="text"
                name="allergies"
                placeholder="Allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="input"
              />
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            Submit
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={() =>
              setFormData({
                first_name: "",
                last_name: "",
                gender: "Male",
                dob: "",
                contact_number: "",
                email: "",
                address: "",
                allergies: "",
                height_cm: "",
                weight_kg: "",
                bp_systolic: "",
                bp_diastolic: "",
                blood_sugar_fasting: "",
                blood_sugar_pp: "",
                cholesterol: "",
                other_conditions: "",
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
