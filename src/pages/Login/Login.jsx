import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aviso, setAviso] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const enviar = (e) => {
    e.preventDefault();

    try {
      login(email, senha);
      navigate("/");
    } catch (err) {
      setAviso(err.message);
    }
  };

  return (
    <main className="container">
      <form className="formulario" onSubmit={enviar}>
        <h1>Entrar no Clarim</h1>

        <label>
          E-mail
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Senha
          <input
            id="senha"
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>

        {aviso && <p className="aviso">{aviso}</p>}

        <button type="submit">Entrar</button>

        <p className="rodape-form">
          Ainda não é assinante? <Link to="/cadastro">Assine o Clarim.</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
