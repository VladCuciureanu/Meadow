import { Request, Response, Router } from "express";
import UserRoutes from "../features/users/users.routes";
import AuthRoutes from "../features/auth/auth.routes";
import BlockRoutes from "../features/blocks/blocks.routes";
import DocumentRoutes from "../features/documents/documents.routes";
import FolderRoutes from "../features/folders/folders.routes";
import TeamRoutes from "../features/teams/teams.routes";
import SpaceRoutes from "../features/spaces/spaces.routes";

const router = Router();

router.get("/health-check", (req: Request, res: Response) => res.send("OK"));

router.use("/teams", TeamRoutes);
router.use("/spaces", SpaceRoutes);
router.use("/folders", FolderRoutes);
router.use("/documents", DocumentRoutes);
router.use("/blocks", BlockRoutes);
router.use("/users", UserRoutes);
router.use("/auth", AuthRoutes);

export default router;
