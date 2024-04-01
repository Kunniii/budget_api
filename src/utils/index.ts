import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

export function checkEnvironmentVariables() {
  return new Promise((resolve, reject) => {
    if (!(process.env.DATABASE_URL && process.env.JWT_SECRET_KEY)) {
      reject(
        new Error(
          "Initialization failed\n\nThe Environment variable is not set correctly!\nRead at README for more information"
        )
      );
    }
    resolve(null);
  });
}

export function generateNonce(): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(48, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        const token = buffer.toString("base64");
        resolve(token);
      }
    });
  });
}

export function createJWT(info: Object): string {
  let key = process.env.JWT_SECRET_KEY!;
  let token = jwt.sign(info, key, { expiresIn: "14d" });
  return token;
}

export function verifyJWT(token: string): boolean {
  return true;
}

export function sendVerifyEmail() {}
