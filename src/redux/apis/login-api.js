import { api } from "./api";

export const loginApi = (data) => {
  return api.post("/login", JSON.stringify(data));
};
