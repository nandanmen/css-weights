import React from "react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, Link } from "@remix-run/react";
import { motion } from "framer-motion";

import { getHighlighter } from "../../utils.server";
import { prompts, type Answer } from "../../prompts";

export let loader: LoaderFunction = async ({ params, request }) => {
  const highlighter = await getHighlighter();
  const questionNumber = Number(params.question) - 1;
  if (questionNumber >= prompts.length) {
    return new Response("Not Found", { status: 404 });
  }

  const { answer, code } = prompts[questionNumber];

  const body = {
    hasPrev: questionNumber > 0,
    code: code.map((code) => highlighter.codeToThemedTokens(code, "css")[0]),
    prompt: code,
    hasNext: questionNumber < prompts.length - 1,
    number: Number(params.question),
    total: prompts.length,
  };

  const { searchParams } = new URL(request.url);
  if (searchParams.has("answer")) {
    return {
      ...body,
      answer,
    };
  }

  return body;
};

export let action: ActionFunction = async ({ request }) => {
  const [, number] = request.url.split("question/");
  const questionNumber = Number(number);
  const response = await request.formData();

  const { answer } = prompts[questionNumber - 1];
  const userAnswers = {
    id: Number(response.get("id")) ?? 0,
    class: Number(response.get("class")) ?? 0,
    type: Number(response.get("type")) ?? 0,
  } as Record<keyof Answer, number>;

  return json<AnswerResponse>({
    results: {
      id: isCorrect("id", userAnswers, answer),
      class: isCorrect("class", userAnswers, answer),
      type: isCorrect("type", userAnswers, answer),
    },
    userAnswers,
    answer,
  });
};

type AnswerKeysWithoutZero = keyof Omit<Answer, "zero">;

type AnswerResponse = {
  results: Record<AnswerKeysWithoutZero, boolean>;
  userAnswers: Record<AnswerKeysWithoutZero, number>;
  answer: Answer;
};

const isCorrect = (
  category: keyof Answer,
  userAnswers?: Record<keyof Answer, number>,
  answer?: Answer
) => {
  if (!answer || !userAnswers) return true;
  if (category === "zero") return true;

  const userAnswer = userAnswers[category];

  if (!answer[category]) return userAnswer === 0;
  return answer[category]?.length === userAnswer;
};

export default function Question() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { code, hasPrev, hasNext, number, total, prompt, answer } =
    useLoaderData();
  const response = useActionData<AnswerResponse>();

  React.useEffect(() => {
    formRef.current?.reset();
  }, [number]);

  const allCorrect = response && Object.values(response.results).every(Boolean);

  const getDefaultValue = (key: AnswerKeysWithoutZero) => {
    if (!response && !answer) return;
    if (answer) {
      return answer[key]?.length ?? 0;
    }
    return response?.userAnswers.id;
  };

  const getAnswer = () => {
    if (answer) return answer;
    if (allCorrect) return response?.answer;
  };

  return (
    <>
      <div className="prompt relative">
        <p className="absolute text-xs top-2 right-3 text-neutral-400">
          {number} / {total}
        </p>
        <Prompt prompt={prompt} tokens={code} answer={getAnswer()} />
        <Link
          to="?answer=true"
          className="absolute bottom-2 left-3 text-neutral-400 text-xs hover:text-[#CABEFF]"
        >
          Show answer
        </Link>
      </div>
      <Form className="w-80 space-y-4" method="post" ref={formRef}>
        <div className="flex gap-3 items-center">
          <Input
            label="ID"
            defaultValue={getDefaultValue("id")}
            correct={response?.results.id}
          />
          <Input
            label="Class"
            defaultValue={getDefaultValue("class")}
            correct={response?.results.class}
          />
          <Input
            label="Type"
            defaultValue={getDefaultValue("type")}
            correct={response?.results.type}
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
              {allCorrect ? <CorrectFeedback /> : <IncorrectFeedback />}
            </div>
          )}
        </div>
      </Form>
    </>
  );
}

type Token = {
  content: string;
  color: string;
  fontStyle: number;
};

const Prompt = ({
  tokens,
  prompt,
  answer,
}: {
  tokens: Array<Token[]>;
  prompt: string[];
  answer?: Answer;
}) => {
  return (
    <pre className="px-12 py-16 bg-neutral-800 md:rounded-md border-neutral-700 border-2 overflow-auto md:flex md:items-center md:justify-center">
      {tokens.map((line, index) => {
        const text = prompt[index];
        const hasMargin = answer && prompt[index + 1] !== " ";
        const category = Object.keys(answer ?? {}).find((category) => {
          if (!answer) return false;
          return answer[category as keyof typeof answer]?.some(
            (prompt) => prompt === text
          );
        });
        const dismissed = answer?.zero?.find((prompt) => prompt === text);
        return (
          <motion.span
            key={`${prompt}-line-${index}`}
            style={hasMargin ? { marginRight: "1rem" } : undefined}
            layout
            className="relative"
            animate={{ opacity: dismissed ? 0.2 : 1 }}
          >
            {line.map((token, index) => (
              <span
                key={`${prompt}-token-${token.content}-${index}`}
                style={{ color: token.color }}
              >
                {token.content}
              </span>
            ))}
            {answer && !dismissed && (
              <motion.span
                className="absolute bottom-full left-0 text-xs text-neutral-400"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                {category}
              </motion.span>
            )}
          </motion.span>
        );
      })}
    </pre>
  );
};

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
  correct = true,
  defaultValue,
}: {
  label: string;
  correct?: boolean;
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
      className={`w-full text-center bg-neutral-800 rounded-md text-5xl p-4 focus-visible:border-[#cabeff] outline-none border-2 placeholder:text-neutral-600 ${
        correct ? "border-neutral-700" : "border-red-500"
      }`}
      defaultValue={defaultValue}
      placeholder="0"
    />
  </div>
);
