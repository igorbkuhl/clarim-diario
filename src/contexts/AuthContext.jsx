import { createContext, useContext, useState } from "react";
import {
  login as authLogin,
  logout as authLogout,
  loginComGoogle as loginGoogle,
} from "../services/auth";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = async (email, senha) => {
    const dados = await authLogin(email, senha);
    iniciarSessao(dados);

    setUsuario({ nome, dados });
  };

  function iniciarSessao(dados) {
    const { token, nome, papel } = dados;
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify({ nome, papel }));
  }

  async function loginComGoogle(credential) {
    iniciarSessao(await loginGoogle(credential));
  }

  const logout = () => {
    authLogout();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loginComGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }

  return contexto;
};

export { AuthProvider, useAuth };
