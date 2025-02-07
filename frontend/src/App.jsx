import { useState, useEffect } from "react";
import axios from "axios";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([]);

 
  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error obteniendo los posts:", error));
  }, []);


  const addPost = (newPost) => {
    axios.post("http://localhost:3000/posts", newPost)
      .then((response) => setPosts([...posts, response.data]))
      .catch((error) => console.error("Error agregando post:", error));
  };

  return (
    <div className="container">
      <h1>LikeMe - Mi querida Red Social</h1>
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
