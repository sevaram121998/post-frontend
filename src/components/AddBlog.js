import React, { useState } from 'react';
import axios from 'axios';
import './AddBlog.css';

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append('title', formData.title);
      formDataWithImage.append('content', formData.content);
      formDataWithImage.append('author', formData.author);
      formDataWithImage.append('image', formData.image);

      const response = await axios.post('http://localhost:8000/blog', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Clear form after successful submission
      setFormData({
        title: '',
        content: '',
        author: '',
        image: null
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-blog">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
