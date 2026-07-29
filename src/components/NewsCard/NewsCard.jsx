import "./NewsCard.css";

import { Link } from "react-router-dom";

function NewsCard({ categoria, titulo, resumo, id }) {
  return (
    <article className="card">
      <span className="card__categoria">{categoria}</span>
      <h2 className="card__titulo">
        <Link to={`/materia/${id}`}>{titulo}</Link>
      </h2>

      {resumo && <p className="card__resumo">{resumo}</p>}
    </article>
  );
}

export default NewsCard;
