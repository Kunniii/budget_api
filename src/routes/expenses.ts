import express from "express";
import type { Request, Response } from "express";
const router = express.Router();

router.get("/:id", (req: Request, res: Response) => {
  res.json({
    OK: true,
    message: "Hello World!",
    data: {
      method: req.method,
      params: req.params,
    },
  });
});
router.post("/", (req: Request, res: Response) => {
  res.json({
    OK: true,
    message: "Hello World!",
    data: {
      method: req.method,
      params: req.params,
    },
  });
});

export default router;
