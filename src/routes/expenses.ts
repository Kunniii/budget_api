import express from "express";
import type { Request, Response } from "express";
const router = express.Router();

router.get("/get/:id", (req: Request, res: Response) => {});
router.get("/new", (req: Request, res: Response) => {});

export default router;
