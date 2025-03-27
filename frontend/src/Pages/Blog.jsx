import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding React',
      content: 'React is a JavaScript library for building user interfaces...',
      author: 'John Doe',
      date: 'October 1, 2023',
    },
    {
      id: 2,
      title: 'Getting Started with MERN Stack',
      content: 'The MERN stack consists of MongoDB, Express, React, and Node.js...',
      author: 'Jane Smith',
      date: 'October 5, 2023',
    },
    {
      id: 3,
      title: 'Tips for Project Management',
      content: 'Effective project management involves planning, execution, and monitoring...',
      author: 'Alice Johnson',
      date: 'October 10, 2023',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h2>{post.title}</h2>
          <p><strong>By:</strong> {post.author} | <strong>Date:</strong> {post.date}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
