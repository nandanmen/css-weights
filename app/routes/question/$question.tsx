import React from "react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, Link } from "@remix-run/react";

import { getHighlighter } from "../../utils.server";
import { prompts } from "../../prompts";

export let loader: LoaderFunction = async ({ params }) => {
  const highlighter = await getHighlighter();
  const questionNumber = Number(params.question) - 1;
  return {
    hasPrev: questionNumber > 0,
    code: highlighter.codeToHtml(prompts[questionNumber].code, { lang: "css" }),
    hasNext: questionNumber < prompts.length - 1,
    number: Number(params.question),
    total: prompts.length,
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

  return json({ correct: isCorrect, response: userAnswers, answers: answer });
};

export default function Question() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { code, hasPrev, hasNext, number, total } = useLoaderData();
  const response = useActionData();

  React.useEffect(() => {
    formRef.current?.reset();
  }, [number]);

  return (
    <>
      <div className="prompt relative">
        <p className="absolute text-xs top-2 right-3 text-neutral-400">
          {number} / {total}
        </p>
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>
      <Form className="w-80 space-y-4" method="post" ref={formRef}>
        <div className="flex gap-3 items-center">
          <Input
            label="ID"
            defaultValue={response?.response[0] ?? 0}
            incorrect={response?.answers[0] !== response?.response[0]}
          />
          <Input
            label="Class"
            defaultValue={response?.response[1] ?? 0}
            incorrect={response?.answers[1] !== response?.response[1]}
          />
          <Input
            label="Type"
            defaultValue={response?.response[2] ?? 0}
            incorrect={response?.answers[2] !== response?.response[2]}
          />
        </div>
        <div className="flex gap-3 justify-center items-center text-sm font-mono relative">
          <LinkButton to={`/question/${number - 1}`} disabled={!hasPrev}>
            Prev
          </LinkButton>
          <button className="py-1 px-2 rounded-md border-2 border-neutral-800 focus-visible:border-[#cabeff] hover:bg-neutral-800 outline-none">
            Submit
          </button>
          <LinkButton to={`/question/${number + 1}`} disabled={!hasNext}>
            Next
          </LinkButton>
          {response && (
            <div className="absolute top-full popup">
              {response.correct ? <CorrectFeedback /> : <IncorrectFeedback />}
            </div>
          )}
        </div>
      </Form>
    </>
  );
}

const CorrectFeedback = () => {
  return (
    <p className="p-2 bg-green-800 border-2 border-green-600 rounded-md">
      You got it 🎉
    </p>
  );
};

const IncorrectFeedback = () => {
  return (
    <p className="p-2 bg-red-800 border-2 border-red-600 rounded-md">
      That's not quite right 😞
    </p>
  );
};

const LinkButton = ({
  to,
  disabled = false,
  children,
}: {
  to: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const disabledClasses = disabled
    ? " text-neutral-600 pointer-events-none cursor-not-allowed"
    : "";
  return (
    <Link
      to={to}
      className={
        "py-1 px-2 rounded-md border-2 border-neutral-900 hover:bg-neutral-800" +
        disabledClasses
      }
    >
      {children}
    </Link>
  );
};

const Input = ({
  label,
  defaultValue = 0,
  incorrect = false,
}: {
  label: string;
  defaultValue?: number;
  incorrect?: boolean;
}) => (
  <div className="font-mono text-center space-y-2">
    <label htmlFor={label} className="block text-neutral-400">
      {label}
    </label>
    <input
      id={label}
      name={label.toLowerCase()}
      type="number"
      className={`w-full text-center bg-neutral-800 rounded-md text-5xl p-4 focus-visible:border-[#cabeff] outline-none border-2 ${
        incorrect ? "border-red-500" : "border-neutral-700"
      }`}
      defaultValue={defaultValue}
    />
  </div>
);
