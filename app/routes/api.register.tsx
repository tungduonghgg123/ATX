import { json } from "@remix-run/node";
import { connectDB } from "~/utils/db.server";
import { User } from "../models/user.server";

export async function action({ request }) {
  await connectDB();

  const { email, password } = await request.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return json({ message: "User already exists" }, { status: 400 });
    }

    const user = new User({ email, password });
    await user.save();

    return json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
