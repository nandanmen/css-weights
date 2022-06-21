import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export let loader: LoaderFunction = () => {
  return redirect("/question/1");
};
