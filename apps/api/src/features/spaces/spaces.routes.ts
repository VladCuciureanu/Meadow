import { Router } from "express";

import spacesController from "./spaces.controller";
import {
  CreateSpaceRequestSchema,
  DeleteSpaceRequestSchema,
  GetSpaceRequestSchema,
  GetSpacesRequestSchema,
  UpdateSpaceRequestSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateSpaceAuthority } from "./middlewares/validate-space-authority";
import { validateSpaceExists } from "./middlewares/validate-space-exists";
import { authenticate } from "../auth/middlewares/authenticate";
import { validateSpaceTeamAuthority } from "./middlewares/validate-space-team-authority";

const SpaceRoutes = Router();

SpaceRoutes.route(`/`)
  .all(authenticate)
  .get(validate(GetSpacesRequestSchema), spacesController.getMany)
  .post(
    validate(CreateSpaceRequestSchema),
    validateSpaceTeamAuthority,
    spacesController.create
  );

SpaceRoutes.route(`/:spaceId`)
  .all(authenticate, validateSpaceExists, validateSpaceAuthority)
  .get(validate(GetSpaceRequestSchema), spacesController.getById)
  .patch(
    validate(UpdateSpaceRequestSchema),
    validateSpaceTeamAuthority,
    spacesController.patch
  )
  .delete(validate(DeleteSpaceRequestSchema), spacesController.delete);

export default SpaceRoutes;
