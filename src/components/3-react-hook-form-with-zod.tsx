/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import simulatedApi from '../api/api';
// import { FormData } from '../types';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'You must be at least 18 years old'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Gender is required',
  }),
  address: z.object({
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
  }),
  hobbies: z
    .array(
      z.object({
        name: z.string().min(1, 'Hobby name is required'),
        years: z.number().min(1, 'Must be at least 1 year'),
      }),
    )
    .min(1, 'At least one hobby is required'),
  startDate: z.date(),
  subscribe: z.boolean(),
  referral: z.string().default(''),
});

// Define FormData type based on schema
type FormData = z.infer<typeof formSchema>;

const ReactHookFormWithZod: React.FC = () => {
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
      // gender: '',
      gender: undefined,
      address: { city: '', state: '' },
      hobbies: [{ name: '' }],
      startDate: new Date(),
      subscribe: false,
      referral: '',
    },
    resolver: zodResolver(formSchema),
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
        {/*<input*/}
        {/*  {...register('firstName', { required: 'First Name is required' })}*/}
        {/*/>*/}
        <input {...register('firstName')} />
        {errors.firstName && (
          // <p style={{color: "orangered"}}>{errors.firstName}</p>
          <p style={{ color: 'orangered' }}>{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && (
          <p style={{ color: 'orangered' }}>{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && (
          <p style={{ color: 'orangered' }}>{errors.email.message}</p>
        )}
      </div>
      <div>
        <label>Age</label>
        <input type='number' {...register('age', { valueAsNumber: true })} />
        {errors.age && (
          <p style={{ color: 'orangered' }}>{errors.age.message}</p>
        )}
      </div>
      <div>
        <label>Gender</label>
        <select {...register('gender')}>
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
        <input {...register('address.city')} placeholder='City' />
        {errors.address?.city && (
          <p style={{ color: 'orangered' }}>{errors.address.city.message}</p>
        )}

        <input {...register('address.state')} placeholder='State' />
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
              {...register(`hobbies.${index}.name`)}
              placeholder='Hobby Name'
            />
            {errors.hobbies?.[index]?.name && (
              <p style={{ color: 'orangered' }}>
                {errors.hobbies[index].name.message}
              </p>
            )}

            <input
              {...register(`hobbies.${index}.years`, { valueAsNumber: true })}
              placeholder='Years'
              type='number'
            />
            {errors.hobbies?.[index]?.years && (
              <p style={{ color: 'orangered' }}>
                {errors.hobbies[index].years.message}
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
            {...register('referral')}
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

export default ReactHookFormWithZod;
