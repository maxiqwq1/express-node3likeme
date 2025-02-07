import { useState } from "react";

const PostForm = ({ addPost }) => {
  const [titulo, setTitulo] = useState("");
  const [img, setImg] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !img || !descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }
    addPost({ titulo, img, descripcion });
    setTitulo("");
    setImg("");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Post</h2>
      <input
        type="text"
        placeholder="Título - o tema"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de imagen"
        value={img}
        onChange={(e) => setImg(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
