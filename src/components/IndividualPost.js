import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css';

const IndividualPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch post data and comments for the given post ID
                const response = await axios.get(`http://localhost:8000/view/${postId}`);
                setPost(response.data.postData[0]);
                setComments(response.data.commentData);
            } catch (error) {
                console.error('Error fetching post and comments:', error);
            }
        };

        fetchData();
    }, [postId]);

    return (
        <div className="post-container">
            {post && (
                <div>
                    {post.image && (
                        <img
                            src={`http://localhost:8000/${post.image.replace(/\\/g, '/')}`}
                            alt="Post Image"
                            className="post-image"
                        />
                    )}
                    <div>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-content">{post.content}</p>
                    </div>
                </div>
            )}
            <div className="comments-container">
                <h3>Comments</h3>
                <ul>
                    {comments.map(comment => (
                        <li key={comment._id} className="comment">
                            <p>
                                <span className="comment-author">{comment.commenterName}</span>
                                <span className="comment-content">{comment.comment}</span>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IndividualPost;
