import { json } from "@remix-run/node";
import jwt from "jsonwebtoken";

export const action = async ({ request }: { request: Request }) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    throw json({ error: "Authorization header is missing" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw json({ error: "Token is missing" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "default_secret");
  } catch (err) {
    throw json({ error: "Invalid token" }, { status: 403 });
  }
  return json({ message: "Token is valid" }, { status: 200 });
};
