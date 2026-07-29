import "./App.css";

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Materia from "./pages/Materia/Materia.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import Login from "./pages/Login/Login.jsx";
import RotaProtegida from "./components/RotaProtegida.jsx";
import Painel from "./pages/Painel/Painel.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [tema, setTema] = useState(() => {
    const salvo = localStorage.getItem("tema");
    if (salvo) return salvo;

    const preferenciaEscuro = window?.matchMedia(
      "(prefers-color-scheme: dark)",
    )?.matches;
    if (preferenciaEscuro) return "dark";

    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  function alternarTema() {
    setTema((t) => (t === "light" ? "dark" : "light"));
  }

  return (
    <>
      <Header tema={tema} aoAlternarTema={alternarTema} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/materia/:id" element={<Materia />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/painel"
          element={
            <RotaProtegida>
              <Painel />
            </RotaProtegida>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
