import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = (email, senha) => {
    if (email !== "igor@clarim.com" || senha !== "minhasenha") {
      throw new Error("E-mail ou senha incorretos.");
    }

    const dados = { nome: "Igor B", email };
    setUsuario(dados);
    localStorage.setItem("usuario", JSON.stringify(dados));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
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
