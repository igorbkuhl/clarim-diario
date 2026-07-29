import { useState } from "react";
import { buscarCEP } from "../../services/viacep";

function Cadastro() {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const campos = [
    [setLogradouro, "logradouro"],
    [setBairro, "bairro"],
    [setCidade, "localidade"],
    [setUf, "uf"],
  ];

  const chamarCEP = async () => {
    const resultados = await buscarCEP(cep);
    campos.forEach(([fn, campo]) => fn(resultados[campo] || ""));
  };

  return (
    <main className="auth">
      <form id="form-cadastro" className="formulario">
        <h1>Criar conta</h1>
        <label>
          Nome Completo
          <input id="nome" type="text" required />
        </label>
        <label>
          E-mail
          <input id="email" type="email" required />
        </label>
        <label>
          Senha
          <input id="senha" type="password" required />
        </label>
        <label>
          CEP
          <input
            id="cep"
            type="text"
            placeholder="00000000"
            required
            onChange={(e) => setCep(e.target.value)}
            onBlur={chamarCEP}
          />
        </label>

        <div className="linha">
          <div className="campo-largo">
            <label>
              Rua
              <input
                id="logradouro"
                type="text"
                value={logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
              />
            </label>
          </div>
          <div className="campo-curto">
            <label>
              Número
              <input id="numero" type="number" required />
            </label>
          </div>
        </div>

        <label>
          Bairro
          <input
            id="bairro"
            type="text"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </label>

        <div className="linha">
          <div className="campo-largo">
            <label>
              Cidade
              <input
                id="cidade"
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
            </label>
          </div>
          <div className="campo-curto">
            <label>
              UF
              <input
                id="uf"
                type="text"
                maxLength="2"
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />
            </label>
          </div>
        </div>

        <p id="aviso" className="aviso"></p>
        <button type="submit" className="btn btn--primary">
          Cadastrar
        </button>
        <p className="rodape-form">
          Já tem conta?
          <a href="login.html">Entrar</a>
        </p>
      </form>
    </main>
  );
}

export default Cadastro;
