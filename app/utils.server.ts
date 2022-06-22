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
  const theme = await getJson("codesandbox-dark.json");
  const langSource = await getJson("css.tmLanguage.json");
  return shiki.getHighlighter({
    theme,
    langs: [{ id: "css", scopeName: "source.css", grammar: langSource }],
  });
};

const getJson = async (path: string) => {
  const resp = await fetch(`https://css-weights.vercel.app/${path}`);
  return resp.json();
};

export const parseDocs = async () => {
  readDir(__dirname);
  const resp = await fetch("https://css-weights.vercel.app/help.md");
  const text = await resp.text();
  return marked.parse(text);
};
