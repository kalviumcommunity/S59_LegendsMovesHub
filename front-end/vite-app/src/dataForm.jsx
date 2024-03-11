import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './dataForm.css';

const AddForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    type: '',
    title: '',
    description: '',
    image: '',
  });

  const [goalsData, setGoalsData] = useState([]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    console.log("Loading.....")
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/create/${formData.category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data added successfully', response);

        const updatedDataResponse = await fetch(`https://s59-legendsmoveshub.onrender.com/api/data/football`);
        const updatedData = await updatedDataResponse.json();

        setGoalsData(updatedData);
      } else {
        console.error('Failed to add data');
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="football">Football</option>
            <option value="cricket">Cricket</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="primary-button">
          Add Data
        </button>
        <Link to="/data" className="secondary-button">
          View Data
        </Link>
      </form>
    </div>
  );
};

export default AddForm;

