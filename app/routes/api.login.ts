import { json } from "@remix-run/node";
import jwt from "jsonwebtoken";
import { connectDB } from "~/utils/db.server";
import { User } from "../models/user.server";

export async function action({ request }) {
  await connectDB();

  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return json({ message: "Invalid email or password" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return json({ token }, { status: 200 });
  } catch (error) {
    return json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
