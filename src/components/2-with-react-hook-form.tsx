/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import simulatedApi from '../api/api';
import { FormData } from '../types';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

const ReactHookForm: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    control,
    getValues,
    handleSubmit,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 18,
      gender: '',
      address: { city: '', state: '' },
      hobbies: [{ name: '' }],
      startDate: new Date(),
      subscribe: false,
      referral: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies', // this is to match the FormData field of hobbies
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await simulatedApi(data);
      console.log('Success:', response);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error: any) {
      console.error('Error:', error);
      setError('root', {
        message: error.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
    >
      <div>
        <label>First Name</label>
        {/*<input*/}
        {/*  name="firstName"*/}
        {/*  value={formData.firstName}*/}
        {/*  onChange={handleChange}*/}
        {/*/>*/}
        <input
          {...register('firstName', { required: 'First Name is required' })}
        />
        {errors.firstName && (
          // <p style={{color: "orangered"}}>{errors.firstName}</p>
          <p style={{ color: 'orangered' }}>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label>Last Name</label>
        <input
          {...register('lastName', { required: 'Last Name is required' })}
        />
        {errors.lastName && (
          <p style={{ color: 'orangered' }}>{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label>Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
        />
        {errors.email && (
          <p style={{ color: 'orangered' }}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Age</label>
        <input
          type='number'
          {...register('age', {
            required: 'Age is required',
            min: { value: 18, message: 'You must be at least 18 years old' },
          })}
        />
        {errors.age && (
          <p style={{ color: 'orangered' }}>{errors.age.message}</p>
        )}
      </div>

      <div>
        <label>Gender</label>
        <select {...register('gender', { required: 'Gender is required' })}>
          <option value=''>Select...</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
        {errors.gender && (
          <p style={{ color: 'orangered' }}>{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label>Address</label>
        <input
          {...register('address.city', { required: 'City is required' })}
          placeholder='City'
        />
        {errors.address?.city && (
          <p style={{ color: 'orangered' }}>{errors.address.city.message}</p>
        )}

        <input
          {...register('address.state', { required: 'State is required' })}
          placeholder='State'
        />
        {errors.address?.state && (
          <p style={{ color: 'orangered' }}>{errors.address.state.message}</p>
        )}
      </div>

      {/* https://react-hook-form.com/docs/usecontroller/controller
          Have to use Controller when dealing with 3rd party library.
      */}
      <div>
        <label>Start Date</label>
        {/*<DatePicker*/}
        {/*  selected={formData.startDate}*/}
        {/*  onChange={(date: Date | null) =>*/}
        {/*    setFormData({...formData, startDate: date || new Date()})*/}
        {/*  }*/}
        {/*/>*/}
        <Controller
          control={control}
          name='startDate'
          render={({ field }) => (
            <DatePicker
              placeholderText='Select date'
              onChange={(date: Date | null) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
      </div>

      <div>
        <label>Hobbies</label>
        {/*{formData.hobbies.map((hobby, index) => (*/}
        {/*  <div key={index}>*/}
        {/*    <input*/}
        {/*      name="name"*/}
        {/*      value={hobby.name}*/}
        {/*      onChange={(e) => handleHobbyChange(index, e)}*/}
        {/*      placeholder="Hobby Name"*/}
        {/*    />*/}
        {/*    {errors.hobbies?.[index]?.name && (*/}
        {/*      <p style={{color: "orangered"}}>{errors.hobbies[index].name}</p>*/}
        {/*    )}*/}

        {/*    {formData.hobbies.length > 1 && (*/}
        {/*      <button type="button" onClick={() => removeHobby(index)}>*/}
        {/*        Remove Hobby*/}
        {/*      </button>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*))}*/}
        {fields.map((hobby, index) => (
          <div key={hobby.id}>
            <input
              {...register(`hobbies.${index}.name`, {
                required: 'Hobby name is required',
              })}
              placeholder='Hobby Name'
            />
            {errors.hobbies?.[index]?.name && (
              <p style={{ color: 'orangered' }}>
                {errors.hobbies[index].name.message}
              </p>
            )}

            {fields.length > 1 && (
              <button type='button' onClick={() => remove(index)}>
                Remove Hobby
              </button>
            )}
          </div>
        ))}
        <button type='button' onClick={() => append({ name: '' })}>
          Add Hobby
        </button>
      </div>

      <div>
        <label htmlFor='sub'>Subscribe to Newsletter</label>
        <input type='checkbox' id='sub' {...register('subscribe')} />
      </div>

      {getValues('subscribe') && (
        <div>
          <label>Referral Source</label>
          <input
            {...register('referral', {
              required: 'Referral source is required if subscribing',
            })}
            placeholder='How did you hear about us?'
          />
          {errors.referral && (
            <p style={{ color: 'orangered' }}>{errors.referral.message}</p>
          )}
        </div>
      )}

      {errors.root && <p style={{ color: 'red' }}>{errors.root.message}</p>}

      <button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ReactHookForm;
