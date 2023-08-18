import swaggerDocument from "@meadow/shared/openapi.json";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";

const router = Router();

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

export default router;
