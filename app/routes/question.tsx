import { Outlet, useLoaderData } from "@remix-run/react";

import { parseDocs } from "../utils.server";

export let loader = () => {
  return parseDocs();
};

export default function QuestionPage() {
  const docs = useLoaderData();
  return (
    <main className="bg-neutral-900 text-neutral-200 py-24 md:py-32 lg:py-48">
      <div className="flex flex-col items-center justify-center space-y-6 mb-48">
        <h1 className="text-5xl font-title font-bold text-center">
          What's that weight?
        </h1>
        <p className="flex gap-1">
          Enter the{" "}
          <a
            href="#what-does-weight-have-anything-to-do-with-css"
            className="flex items-center gap-1 underline"
          >
            weight{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
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
