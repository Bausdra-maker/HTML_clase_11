import { useState, useEffect } from "react";
import "./App.css";

const URL = "https://api.github.com/users/Bausdra-maker";

function App() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    async function traerPerfil() {
      try {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`);
        }
        const perfil = await respuesta.json();
        console.log(perfil);
        setDatos(perfil);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setCargando(!cargando);
      }
    }
    traerPerfil();
  }, []);

  if (cargando) {
    return <p>cargando.6.7...</p>;
  }

  if (error) {
    return <p>Error {error}</p>;
  }

  return (
    <>
      <h1>Fetching Data</h1>
      <h2>lista usuarios</h2>
      <img
        src={datos.avatar_url}
        alt={`Foto de ${datos.name} || ${datos.login}`}
        width={"150px"}
      />
      <h3>{datos?.name}</h3>
      <p>Repositorios publicos: {datos.public_repos}</p>
    </>
  );
}

export default App;
