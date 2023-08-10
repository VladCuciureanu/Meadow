import { CommonRoutesConfig } from "../common/common.routes";
import express from "express";

import teamsMiddleware from "./teams.middleware";
import teamsController from "./teams.controller";

export class TeamsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "TeamsRoutes");
  }

  configureRoutes() {
    this.app.route(`/teams`);
    // .get(TeamsController.listTeams)
    // .post(TeamsController.createTeam);

    this.app.param(`teamId`, teamsMiddleware.extractTeamId);
    this.app
      .route(`/teams/:teamId`)
      .all(teamsMiddleware.validateTeamExists)
      .get(teamsController.getTeamById);
    // .delete(TeamsController.removeTeam)
    // .put(TeamsController.put)
    // .patch(TeamsController.patch);

    return this.app;
  }
}
