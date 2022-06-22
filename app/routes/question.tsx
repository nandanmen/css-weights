import { Outlet, useLoaderData } from "@remix-run/react";

import { parseDocs } from "../utils.server";

export let loader = () => {
  return parseDocs();
};

export default function QuestionPage() {
  const docs = useLoaderData();
  return (
    <main className="bg-neutral-900 text-neutral-200 min-h-screen pb-48">
      <div className="flex flex-col items-center justify-center space-y-6 h-screen">
        <h1 className="text-5xl font-title text-sky-300 text-center">
          What's that weight?
        </h1>
        <p className="flex gap-1">
          Enter the{" "}
          <a
            href="#what-does-weight-have-anything-to-do-with-css"
            className="flex items-center gap-1 text-sky-300"
          >
            weight{" "}
            <span className="w-5 h-5 bg-sky-500 rounded-md text-sky-100 flex items-center justify-center">
              ?
            </span>
          </a>{" "}
          of the following CSS selector:
        </p>
        <Outlet />
      </div>
      <article
        dangerouslySetInnerHTML={{ __html: docs }}
        className="prose prose-invert mx-auto prose-headings:font-title prose-headings:scroll-mt-12 p-4"
      />
    </main>
  );
}
