import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
});

async function listarNoticias() {
  const { data } = await api.get("/api/noticias");
  return data;
}

async function buscarNoticia(id) {
  const { data } = await api.get(`/api/noticias/${id}`);
  return data;
}

export { listarNoticias, buscarNoticia };
