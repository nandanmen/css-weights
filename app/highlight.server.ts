import fs from "fs";
const shiki = require("shiki");

export const getHighlighter = () => {
  return shiki.getHighlighter({
    theme: JSON.parse(fs.readFileSync("./codesandbox-dark.json", "utf-8")),
  });
};
