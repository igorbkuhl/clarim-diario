import "./Home.css";

import NewsCard from "../../components/NewsCard/NewsCard.jsx";
import { listarNoticias } from "../../services/noticias.js";
import { useState, useEffect } from "react";

function Home() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await listarNoticias();
        setNoticias(dados);
      } catch (err) {
        setErro("Não foi possível carregar as notícias.", err);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) return <p className="aviso-tela">Carregando a edição...</p>;
  else if (erro) return <p className="aviso-tela">{erro}</p>;

  const [manchete, ...demais] = noticias;

  return (
    <main className="container">
      <section className="manchete">
        <NewsCard
          categoria={manchete.categoria}
          titulo={manchete.titulo}
          resumo={manchete.resumo}
          id={manchete.id}
        />
      </section>

      <section className="grade">
        {demais.map(({ categoria, titulo, resumo, id }, i) => (
          <div key={i}>
            <NewsCard
              categoria={categoria}
              titulo={titulo}
              resumo={resumo}
              id={id}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
