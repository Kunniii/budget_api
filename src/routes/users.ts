import express from "express";
const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

router.post("/login", (req, res) => {
  res.json({
    message: "login",
  });
});

router.post("/register", (req, res) => {
  res.json({
    message: "register",
  });
});

router.post("/verify", (req, res) => {
  res.json({
    message: "verify",
  });
});

export default router;
