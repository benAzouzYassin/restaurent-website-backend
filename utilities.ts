import jwt from "jsonwebtoken";

interface Payload {
  name: string;
  isAdmin: boolean;
}

export function generateToken(payload: Payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}
