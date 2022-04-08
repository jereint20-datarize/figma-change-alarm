import fs from "fs";
import _ from "lodash";
import { requestFigmaAPI } from "./requestFigmaAPI.js";

async function getDesignTokenFromFigma() {
  const { data } = await requestFigmaAPI({
    fileKey: process.env.FIGMA_FILEKEY,
    token: process.env.FIGMA_TOKEN,
  });

  const beforeFigma = JSON.parse(fs.readFileSync("./figmaCanvas.json"));

  const afterFigma = {
    ButtonCanvas: data.document.children
      .find((canvas) => canvas.name === "Button")
      .children.find((frame) => frame.name === "Button Components"),
  };

  if (_.isEqual(beforeFigma, afterFigma)) {
    console.log("No change in Figma");
    return;
  }

  fs.writeFile(
    "figmaCanvas.json",
    JSON.stringify(afterFigma),
    "utf-8",
    function (err) {
      if (err) throw err;
    }
  );
}

getDesignTokenFromFigma();
