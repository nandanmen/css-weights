import { Outlet } from "@remix-run/react";

export default function QuestionPage() {
  return (
    <div className="bg-neutral-900 text-neutral-200 h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-5xl font-title text-sky-300 text-center">
        What's that weight?
      </h1>
      <p>Enter the weight of the following CSS selector:</p>
      <Outlet />
    </div>
  );
}
