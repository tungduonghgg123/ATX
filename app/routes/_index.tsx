import { redirect, type MetaFunction } from "@remix-run/node";
export const loader = async () => {
  throw redirect(`/app`);
};
export const meta: MetaFunction = () => {
  return [
    { title: "ATX" },
    { name: "description", content: "Welcome to ATX!" },
  ];
};
