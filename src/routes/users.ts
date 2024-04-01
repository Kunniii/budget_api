import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import { createJWT, generateNonce, verifyJWT } from "../utils";
const router = express.Router();

const prisma = new PrismaClient();

router.post("/", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

router.post("/login", async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    let user = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        nonce: true,
        hash: true,
      },
    });

    if (bcrypt.compareSync(password, user.hash)) {
      const token = createJWT(user);
      return res.json({
        OK: true,
        message: "Authentication successful",
        data: token,
      });
    } else {
      return res.status(401).json({
        OK: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      return res.status(401).json({
        OK: false,
        message: "Invalid email or password",
      });
    }
  }
});

router.post("/register", async (req: Request, res: Response) => {
  const givenEmail = req.body.email;
  const givenPassword = req.body.password;

  if (!givenEmail || !givenPassword) {
    return res.status(400).json({
      OK: false,
      message: "Please provide an email and password",
    });
  }

  // Check if user email already exists
  let userEmail = await prisma.user.findUnique({
    where: {
      email: givenEmail,
    },
  });

  if (userEmail) {
    // I can brute force to get the email registered :<
    return res.json({
      OK: false,
      message: "Email Already Exists",
    });
  }
  try {
    let hash = bcrypt.hashSync(givenPassword, 10);
    let nonce = await generateNonce();
    try {
      let user = await prisma.user.create({
        data: {
          email: givenEmail,
          hash: hash,
          nonce: nonce,
        },
        select: {
          id: true,
          email: true,
          nonce: true,
        },
      });

      //TODO: Send an email verification

      return res.json({
        OK: true,
        message: "User Created Successfully",
        data: user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        OK: false,
        message: "Cannot Create User",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      OK: false,
      message: "Cannot Hash Password",
    });
  }
});

router.post("/verify", (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token || !verifyJWT(token)) {
    return res.status(401).json({
      OK: false,
      message: "Unauthorized",
    });
  }

  return res.json({
    OK: true,
    message: "Authentication successful",
  });
});

export default router;
