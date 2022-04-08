import axios from "axios";
import { FIGMA_URL_GETFILE } from "./common/constant.js";

export async function requestFigmaAPI({ token, fileKey }) {
  return axios({
    method: "GET",
    headers: {
      "X-Figma-Token": token,
    },
    url: FIGMA_URL_GETFILE + fileKey,
  })
    .then((res) => {
      console.log("requestFigma success");
      return res;
    })
    .catch((err) => {
      console.log("requestFigma err");
      return;
    });
}
