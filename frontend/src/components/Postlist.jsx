const PostList = ({ posts }) => {
    return (
      <div>
        <h2>Publicaciones</h2>
        {posts.length === 0 ? (
          <p> Acaso No hay publicaciones aún.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.titulo}</h3>
              <img src={post.img} alt={post.titulo} width="200" />
              <p>{post.descripcion}</p>
              <p>❤️ {post.likes} likes</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default PostList;
  