import { api } from "./api";

export const dashApi = (id) => {
  return api.get(`/${id}`, {
    token: localStorage?.getItem("token"),
  });
};
