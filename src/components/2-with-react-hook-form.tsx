/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import simulatedApi from "../api/api";
import {FormData} from "../types";
import {useForm} from 'react-hook-form';

const ReactHookForm: React.FC = () => {
  const {
    register,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      gender: "",
      address: {city: "", state: ""},
      hobbies: [{name: ""}],
      startDate: new Date(),
      subscribe: false,
      referral: "",
    },
  });

  return (
    <form
      // onSubmit={handleSubmit}
      style={{display: "flex", flexDirection: "column", gap: 5}}
    >
      <div>
        <label>First Name</label>
        {/*<input*/}
        {/*  name="firstName"*/}
        {/*  value={formData.firstName}*/}
        {/*  onChange={handleChange}*/}
        {/*/>*/}
        <input
          {...register('firstName', {
            required: 'First Name is required',
          })}
        />
        {errors.firstName && (
          <p style={{color: "orangered"}}>{errors.firstName}</p>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <p style={{color: "orangered"}}>{errors.lastName}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange}/>
        {errors.email && <p style={{color: "orangered"}}>{errors.email}</p>}
      </div>

      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p style={{color: "orangered"}}>{errors.age}</p>}
      </div>

      <div>
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p style={{color: "orangered"}}>{errors.gender}</p>}
      </div>

      <div>
        <label>Address</label>
        <input
          name="city"
          value={formData.address.city}
          onChange={(e) =>
            handleChange({
              ...e,
              target: {...e.target, name: "address.city"},
            })
          }
          placeholder="City"
        />
        {errors.address?.city && (
          <p style={{color: "orangered"}}>{errors.address.city}</p>
        )}

        <input
          name="state"
          value={formData.address.state}
          onChange={(e) =>
            handleChange({
              ...e,
              target: {...e.target, name: "address.state"},
            })
          }
          placeholder="State"
        />
        {errors.address?.state && (
          <p style={{color: "orangered"}}>{errors.address.state}</p>
        )}
      </div>

      <div>
        <label>Start Date</label>
        <DatePicker
          selected={formData.startDate}
          onChange={(date: Date | null) =>
            setFormData({...formData, startDate: date || new Date()})
          }
        />
      </div>

      <div>
        <label>Hobbies</label>
        {formData.hobbies.map((hobby, index) => (
          <div key={index}>
            <input
              name="name"
              value={hobby.name}
              onChange={(e) => handleHobbyChange(index, e)}
              placeholder="Hobby Name"
            />
            {errors.hobbies?.[index]?.name && (
              <p style={{color: "orangered"}}>{errors.hobbies[index].name}</p>
            )}

            {formData.hobbies.length > 1 && (
              <button type="button" onClick={() => removeHobby(index)}>
                Remove Hobby
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addHobby}>
          Add Hobby
        </button>
      </div>

      <div>
        <label htmlFor="sub">Subscribe to Newsletter</label>
        <input
          type="checkbox"
          id="sub"
          name="subscribe"
          checked={formData.subscribe}
          onChange={(e) =>
            setFormData({...formData, subscribe: e.target.checked})
          }
        />
      </div>

      {formData.subscribe && (
        <div>
          <label>Referral Source</label>
          <input
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            placeholder="How did you hear about us?"
          />
          {errors.referral && (
            <p style={{color: "orangered"}}>{errors.referral}</p>
          )}
        </div>
      )}

      {errors.root && <p style={{color: "red"}}>{errors.root}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ReactHookForm;
