import { Router } from "express";

import teamsMiddleware from "./teams.middleware";
import teamsController from "./teams.controller";
import { validate } from "../common/common.middleware";
import {
  CreateTeamSchema,
  PatchTeamSchema,
  UpdateTeamSchema,
} from "@meadow/shared";

const TeamRoutes = Router();

TeamRoutes.route(`/teams`)
  .get(teamsController.getMany)
  .post(validate(CreateTeamSchema), teamsController.create);

TeamRoutes.route(`/teams/:teamId`)
  .all(teamsMiddleware.validateTeamExists)
  .get(teamsController.getById)
  .put(validate(UpdateTeamSchema), teamsController.put)
  .patch(validate(PatchTeamSchema), teamsController.patch)
  .delete(teamsController.delete);

export default TeamRoutes;
