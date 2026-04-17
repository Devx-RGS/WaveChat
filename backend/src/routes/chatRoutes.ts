import { Router } from "express";
import { protectRoute } from "../middleware/auth";
import { getChats, getChatOrCreateOne } from "../controllers/chatController";

const router = Router();

router.use(protectRoute);

router.get("/, getChats")
router.post("/with/:particiapntId", getChatOrCreateOne);

export default router;