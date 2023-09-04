import { Router } from "express";

import teamsController from "./teams.controller";
import {
  CreateTeamRequestSchema,
  DeleteTeamRequestSchema,
  GetTeamRequestSchema,
  GetTeamsRequestSchema,
  UpdateTeamRequestSchema,
} from "@meadow/shared";
import { validate } from "../common/middlewares/validate";
import { validateTeamExists } from "./middlewares/validate-team-exists";
import { validateTeamMembership } from "./middlewares/validate-team-membership";
import { authenticate } from "../auth/middlewares/authenticate";

const TeamRoutes = Router();

TeamRoutes.route(`/`)
  .all(authenticate)
  .get(validate(GetTeamsRequestSchema), teamsController.getMany)
  .post(validate(CreateTeamRequestSchema), teamsController.create);

TeamRoutes.route(`/:teamId`)
  .all(authenticate, validateTeamExists, validateTeamMembership)
  .get(validate(GetTeamRequestSchema), teamsController.getById)
  .patch(validate(UpdateTeamRequestSchema), teamsController.patch)
  .delete(validate(DeleteTeamRequestSchema), teamsController.delete);

export default TeamRoutes;
