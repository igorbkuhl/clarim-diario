import "./Materia.css";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { buscarNoticia } from "../../services/noticias";

function Materia() {
  const { id } = useParams();

  const [noticia, setNoticia] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await buscarNoticia(id);
        setNoticia(dados);
      } catch (err) {
        setErro("Matéria não encontrada.", err);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  if (carregando) return <p className="aviso-tela">Carregando a edição...</p>;
  else if (erro) return <p className="aviso-tela">{erro}</p>;

  if (!noticia) {
    return (
      <main className="container">
        <p>
          Matéria não encontrada - Nem o Homem-Aranha Destruiria uma Página tão
          Rápido.
        </p>
        <Link to="/">Voltar à capa</Link>
      </main>
    );
  }

  return (
    <main className="container materia">
      <Link className="materia__voltar" to="/">
        Voltar à capa
      </Link>
      <span className="materia__categoria">{noticia.categoria}</span>
      <h1 className="noticia__titulo">{noticia.titulo}</h1>
      <p className="materia__resumo">{noticia.resumo}</p>
      <div className="materia__texto">
        <p>{noticia.texto}</p>
      </div>
    </main>
  );
}

export default Materia;
