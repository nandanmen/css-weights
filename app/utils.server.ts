import fs from "fs";
import { fetch } from "@remix-run/node";
import { marked } from "marked";
const shiki = require("shiki");

const readDir = async (dir: string) => {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });
  files.map(async (file) => {
    if (file.isDirectory()) {
      readDir(`${dir}/${file.name}`);
    } else {
      console.log(`${dir}/${file.name}`);
    }
  });
};

export const getHighlighter = async () => {
  const resp = await fetch(
    "https://css-weights.vercel.app/codesandbox-dark.json"
  );
  const theme = await resp.json();
  return shiki.getHighlighter({ theme });
};

export const parseDocs = async () => {
  readDir(__dirname);
  const resp = await fetch("https://css-weights.vercel.app/help.md");
  const text = await resp.text();
  return marked.parse(text);
};
