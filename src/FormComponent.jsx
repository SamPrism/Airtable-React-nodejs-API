import React, { useState } from 'react';
import axios from 'axios';

export default function FormComponent() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/form', form);
      setStatus('✅ Submitted successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('❌ Error submitting form.');
    }
  };

  return (
    <div className='formSection'>
      <h1>Airtable Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        /><br /><br />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br /><br />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          required
        /><br /><br />
        <button className='button' type="submit">Submit</button>
        <p>{status}</p>
      </form>
    </div>
  );
}
