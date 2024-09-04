import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from './schema';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = async (data) => {
    setSubmittedData(data); 
    try {
      const response = await fetch('http://localhost:5000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success:', responseData);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-lg mx-auto p-4 shadow-lg mt-11 rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        {!submittedData && (
          <>
          <h2 className="text-3xl font-bold mb-12">Contact Form</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-bold m-2">Name:</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-3 py-2 border rounded bg-slate-900"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold m-2">Email:</label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 border rounded bg-slate-900"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-white font-bold m-2">Message:</label>
              <textarea
                id="message"
                {...register('comment')}
                rows="4"
                cols="50"
                className="w-full px-3 py-2 border rounded bg-slate-900"
              />
              {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
            </div>

            <div className="mb-4">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Submit
              </button>
            </div>
          </>
        )}

        {submittedData && (
          <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded">
            <h2 className="text-lg font-bold mb-2">Submitted Data:</h2>
            <pre className="bg-white/10 backdrop-blur-sm rounded">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </>
  );
};
export default Contact;