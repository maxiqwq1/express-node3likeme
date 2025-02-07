import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/posts";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
        } catch (error) {
            console.error("Error al obtener los posts:", error);
        }
    };

    const handleLike = async (id) => {
      try {
        const response = await axios.patch(`http://localhost:3000/posts/${id}/like`);
          if (response.status === 200) {
              setPosts(posts.map(post =>
                  post.id === id ? { ...post, likes: response.data.likes } : post
              ));
          }
      } catch (error) {
          console.error("Error al dar like:", error);
      }
  };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchPosts();
        } catch (error) {
            console.error("Error al eliminar el post:", error);
        }
    };

    return (
        <div className="container">
            <h2>Lista de Posts</h2>
            {posts.length === 0 ? (
                <p>No hay publicaciones aún.</p>
            ) : (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <h3>{post.titulo}</h3>
                        <img src={post.img} alt={post.titulo} width="200" />
                        <p>{post.descripcion}</p>
                        <p>❤️ {post.likes} Me Gusta</p>
                        <button className="like-button" onClick={() => handleLike(post.id)}>❤️ Love it</button>
                        <button className="delete-button" onClick={() => handleDelete(post.id)}>🗑️ Papelera</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
