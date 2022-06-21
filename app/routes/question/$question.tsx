import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, Link } from "@remix-run/react";

import { getHighlighter } from "../../highlight.server";
import { prompts } from "../../prompts";

export let loader: LoaderFunction = async ({ params }) => {
  const highlighter = await getHighlighter();
  const questionNumber = Number(params.question) - 1;
  return {
    hasPrev: questionNumber > 0,
    code: highlighter.codeToHtml(prompts[questionNumber].code, { lang: "css" }),
    hasNext: questionNumber < prompts.length - 1,
    number: Number(params.question),
  };
};

export let action: ActionFunction = async ({ request }) => {
  const [, number] = request.url.split("question/");
  const questionNumber = Number(number);

  const { answer } = prompts[questionNumber - 1];
  const response = await request.formData();
  const userAnswers = [
    response.get("id") ?? 0,
    response.get("class") ?? 0,
    response.get("type") ?? 0,
  ].map((answer) => Number(answer));
  const isCorrect = answer.every((col, index) => userAnswers[index] === col);

  return json({ correct: isCorrect, answers: userAnswers });
};

export default function Question() {
  const { code, hasPrev, hasNext, number } = useLoaderData();
  const response = useActionData();

  return (
    <>
      <div
        className="p-12 bg-neutral-800 md:rounded-md border-neutral-700 border-2 md:w-10/12 flex items-center justify-center"
        dangerouslySetInnerHTML={{ __html: code }}
      />
      <Form className="w-80 space-y-4" method="post">
        <div className="flex gap-3">
          <Input label="ID" defaultValue={response?.answers[0] ?? 0} />
          <Input label="Class" defaultValue={response?.answers[1] ?? 0} />
          <Input label="Type" defaultValue={response?.answers[2] ?? 0} />
        </div>
        <div className="flex gap-3 justify-center items-center text-sm font-mono">
          <LinkButton to={`/question/${number - 1}`} disabled={!hasPrev}>
            Prev
          </LinkButton>
          <button className="py-1 px-2 rounded-sm border-2 border-neutral-800 focus-visible:border-[#cabeff] outline-none">
            Submit
          </button>
          <LinkButton to={`/question/${number + 1}`} disabled={!hasNext}>
            Next
          </LinkButton>
        </div>
      </Form>
      {response &&
        (response.correct ? (
          <p>You got it 🎉</p>
        ) : (
          <p>That's not quite right 😞</p>
        ))}
    </>
  );
}

const LinkButton = ({
  to,
  disabled = false,
  children,
}: {
  to: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className={
        disabled
          ? "text-neutral-600 pointer-events-none cursor-not-allowed"
          : ""
      }
    >
      {children}
    </Link>
  );
};

const Input = ({
  label,
  defaultValue = 0,
}: {
  label: string;
  defaultValue?: number;
}) => (
  <div className="font-mono text-center space-y-2">
    <label htmlFor={label} className="block text-neutral-400">
      {label}
    </label>
    <input
      id={label}
      name={label.toLowerCase()}
      type="number"
      className="w-full text-center bg-neutral-800 rounded-md text-5xl p-4 border-2 border-neutral-700 focus-visible:border-[#cabeff] outline-none"
      defaultValue={defaultValue}
    />
  </div>
);
