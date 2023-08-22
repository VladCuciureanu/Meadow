import { Router } from "express";

import teamsController from "./teams.controller";
import {
  CreateTeamSchema,
  PatchTeamSchema,
  UpdateTeamSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateTeamExists } from "./middlewares/validate-team-exists";
import { validateTeamMembership } from "./middlewares/validate-team-membership";

const TeamRoutes = Router();

TeamRoutes.route(`/`)
  .get(teamsController.getMany)
  .post(validate(CreateTeamSchema), teamsController.create);

TeamRoutes.route(`/:teamId`)
  .all(validateTeamExists, validateTeamMembership)
  .get(teamsController.getById)
  .put(validate(UpdateTeamSchema), teamsController.put)
  .patch(validate(PatchTeamSchema), teamsController.patch)
  .delete(teamsController.delete);

export default TeamRoutes;
