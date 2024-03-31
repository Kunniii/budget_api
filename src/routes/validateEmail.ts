import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const code = req.query.code;
  const email = req.query.email;

  res.json({
    params: {
      email,
      code,
    },
  });
});

export default router;
