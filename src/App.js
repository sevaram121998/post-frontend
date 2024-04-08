import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BlogList from './components/BlogList';
import IndividualPost from './components/IndividualPost';
import NewBlog from './components/AddBlog';


function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/new-blog">Add Post</Link></li>
            <li><Link to="/user">User</Link></li>    
          </ul>
        </nav>
        <div className="App">
          <Routes>
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:postId" element={<IndividualPost />} />
            <Route path="/new-blog" element={<NewBlog />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
