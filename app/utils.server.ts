import { fetch } from "@remix-run/node";
import { marked } from "marked";
const shiki = require("shiki");

export const getHighlighter = async () => {
  const resp = await fetch(
    "https://css-weights.vercel.app/codesandbox-dark.json"
  );
  const theme = await resp.json();
  return shiki.getHighlighter({ theme });
};

export const parseDocs = async () => {
  const resp = await fetch("https://css-weights.vercel.app/help.md");
  const text = await resp.text();
  return marked.parse(text);
};
