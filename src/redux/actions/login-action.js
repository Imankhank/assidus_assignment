import { LOGIN_ACTION } from "../types";

export const loginAction = (data, onSuccess, onError) => {
  console.log(data);
  return {
    type: LOGIN_ACTION,
    data,
    onSuccess,
    onError,
  };
};
