import fs from "fs";
import { marked } from "marked";
const shiki = require("shiki");

export const getHighlighter = () => {
  return shiki.getHighlighter({
    theme: JSON.parse(
      fs.readFileSync(`${__dirname}/../../app/codesandbox-dark.json`, "utf-8")
    ),
  });
};

export const parseDocs = () => {
  return marked.parse(
    fs.readFileSync(`${__dirname}/../../app/help.md`, "utf-8")
  );
};
