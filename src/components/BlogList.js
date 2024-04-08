import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/blog');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="blog-list-container">
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id} className="blog-item">
                        <Link to={`/blog/${blog._id}`} className="blog-link">
                            <h2 className="blog-title">{blog.title}</h2>
                            <p className="blog-content">{blog.content}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
