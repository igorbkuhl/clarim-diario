import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { buscarCEP } from "../../services/viacep";
import { cadastrar } from "../../services/auth";

function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [aviso, setAviso] = useState("");
  const navigate = useNavigate();

  const [telefone, setTelefone] = useState("");
  function atualizarCampo(e) {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
  }

  async function preencherEndereco() {
    if (!form.cep) return;
    try {
      setAviso("Buscando CEP…");
      const end = await buscarCEP(form.cep);
      setForm((f) => ({
        ...f,
        logradouro: end.logradouro,
        bairro: end.bairro,
        cidade: end.localidade,
        uf: end.uf,
      }));
      setAviso("");
    } catch (erro) {
      setAviso(erro.message);
    }
  }

  async function enviar(e) {
    e.preventDefault();
    try {
      await cadastrar(form.nome, form.email, form.senha);
      navigate("/login");
    } catch (erro) {
      console.log(erro);
    }
  }

  return (
    <main className="container">
      <form className="formulario" onSubmit={enviar}>
        <h1>Assine o Clarim</h1>

        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          placeholder="+00 (00) 90000-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        <label htmlFor="nome">Nome completo</label>
        <input id="nome" value={form.nome} onChange={atualizarCampo} required />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={atualizarCampo}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          id="senha"
          value={form.senha}
          onChange={atualizarCampo}
          minLength={8}
          required
        />

        <label htmlFor="cep">CEP</label>
        <input
          id="cep"
          value={form.cep}
          onChange={atualizarCampo}
          onBlur={preencherEndereco}
          placeholder="00000-000"
          required
        />

        <label htmlFor="logradouro">Rua</label>
        <input
          id="logradouro"
          value={form.logradouro}
          onChange={atualizarCampo}
        />

        <label htmlFor="bairro">Bairro</label>
        <input id="bairro" value={form.bairro} onChange={atualizarCampo} />

        <label htmlFor="cidade">Cidade</label>
        <input id="cidade" value={form.cidade} onChange={atualizarCampo} />

        <label htmlFor="uf">UF</label>
        <input
          id="uf"
          value={form.uf}
          onChange={atualizarCampo}
          maxLength={2}
        />

        {aviso && <p className="aviso">{aviso}</p>}

        <button type="submit">Assinar</button>

        <p className="rodape-form">
          Já é assinante? <Link to="/login">Entre no Clarim.</Link>
        </p>
      </form>
    </main>
  );
}

export default Cadastro;
