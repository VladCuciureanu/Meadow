import { Router } from "express";

import teamsMiddleware from "./teams.middleware";
import teamsController from "./teams.controller";

const TeamRoutes = Router();

TeamRoutes.route(`/teams`).get(teamsController.listTeams);
// .post(TeamsController.createTeam);

TeamRoutes.param(`teamId`, teamsMiddleware.extractTeamId);
TeamRoutes.route(`/teams/:teamId`)
  .all(teamsMiddleware.validateTeamExists)
  .get(teamsController.getTeamById);
// .delete(TeamsController.removeTeam)
// .put(TeamsController.put)
// .patch(TeamsController.patch);

export default TeamRoutes;
