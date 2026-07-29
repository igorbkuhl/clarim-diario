import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3333" });

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function listarNoticias() {
  await esperar(800);
  const { data } = await api.get("/noticias");
  return data;
}

async function buscarNoticia(id) {
  const { data } = await api.get(`/noticias/${id}`);
  return data;
}

export { listarNoticias, buscarNoticia };
