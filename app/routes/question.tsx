import { Outlet, useLoaderData } from "@remix-run/react";

import { parseDocs } from "../utils.server";

export let loader = () => {
  return parseDocs();
};

export default function QuestionPage() {
  const docs = useLoaderData();
  return (
    <main className="bg-neutral-900 text-neutral-200 pb-24 md:pb-32 lg:pb-48">
      <header className="w-screen">
        <ul className="flex justify-between items-center w-full p-4 text-sm">
          <li className="text-neutral-400">
            Made by{" "}
            <a
              className="hover:text-[#CABEFF]"
              target="_blank"
              href="https://twitter.com/nandafyi"
              rel="noreferrer"
            >
              @nandafyi
            </a>
          </li>
          <li>
            <a
              className="hover:text-[#CABEFF]"
              target="_blank"
              href="https://github.com/narendrasss/css-weights"
              rel="noreferrer"
            >
              <svg width="24" height="24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </header>
      <div className="flex flex-col items-center justify-center space-y-6 mb-48 pt-24 md:pt-32 lg:pt-40 lg:mb-56">
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
      <div className="mt-12">
        <button
          className="mx-auto text-lg bg-neutral-800 border-2 border-neutral-700 rounded-md p-4 shadow-xl font-bold hover:bg-neutral-700 flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          Let's give it a try!{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 11l7-7 7 7M5 19l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
