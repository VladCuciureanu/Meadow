import express from "express";
import teamsService from "./teams.service";

class TeamsMiddleware {
  async validateTeamExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const team = await teamsService.getById(req.params.teamId);
    if (team) {
      next();
    } else {
      res.status(404).send({ error: `Team ${req.params.teamId} not found` });
    }
  }
}

export default new TeamsMiddleware();
