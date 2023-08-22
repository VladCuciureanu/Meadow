import { Request, Response, Router } from "express";
import UserRoutes from "../features/users/users.routes";
import AuthRoutes from "../features/auth/auth.routes";
import BlockRoutes from "../features/blocks/blocks.routes";
import DocumentRoutes from "../features/documents/documents.routes";
import FolderRoutes from "../features/folders/folders.routes";
import TeamRoutes from "../features/teams/teams.routes";
import SpaceRoutes from "../features/spaces/spaces.routes";
import { authenticate } from "../features/auth/middlewares/authenticate";

const router = Router();

router.get("/health-check", (req: Request, res: Response) => res.send("OK"));

router.use("/teams", authenticate, TeamRoutes);
router.use("/spaces", authenticate, SpaceRoutes);
router.use("/folders", authenticate, FolderRoutes);
router.use("/documents", authenticate, DocumentRoutes);
router.use("/blocks", authenticate, BlockRoutes);
router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);

export default router;
