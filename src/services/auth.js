import { api } from "./api";

export async function login(email, senha) {
  const { data } = await api.post("/api/auth/login", { email, senha });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

export async function cadastrar(nome, email, senha) {
  await api.post("/api/usuarios", { nome, email, senha });
}

export async function loginComGoogle(credential) {
  const { data } = await api.post("/api/auth/google", { credential });
  return data;
}
