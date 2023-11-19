import { DASH_ACTION } from "../types";

export const dashAction = (id, onSuccess, onError) => {
  console.log(id);
  return {
    type: DASH_ACTION,
    id,
    onSuccess,
    onError,
  };
};
