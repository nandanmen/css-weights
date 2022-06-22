import { fetch } from "@remix-run/node";
import { marked } from "marked";

import { theme } from "./theme.server";
import { css } from "./lang.server";

const shiki = require("shiki");

export const getHighlighter = async () => {
  return shiki.getHighlighter({
    theme,
    langs: [{ id: "css", scopeName: "source.css", grammar: css }],
  });
};

export const parseDocs = async () => {
  const resp = await fetch("https://css-weights.vercel.app/help.md");
  const text = await resp.text();
  return marked.parse(text);
};
