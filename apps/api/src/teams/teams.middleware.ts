import express from "express";
import debug from "debug";
import teamsService from "./teams.service";

const log: debug.IDebugger = debug("api:teams:middlewares");

class TeamsMiddleware {
  // async validateRequiredTeamBodyFields(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   if (req.body && req.body.email && req.body.password) {
  //     next();
  //   } else {
  //     res
  //       .status(400)
  //       .send({ error: `Missing required fields email and password` });
  //   }
  // }

  // async validateSameEmailDoesntExist(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   const team = await teamService.getTeamByEmail(req.body.email);
  //   if (team) {
  //     res.status(400).send({ error: `Team email already exists` });
  //   } else {
  //     next();
  //   }
  // }

  // async validateSameEmailBelongToSameTeam(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) {
  //   const team = await teamService.getTeamByEmail(req.body.email);
  //   if (team && team.id === req.params.teamId) {
  //     next();
  //   } else {
  //     res.status(400).send({ error: `Invalid email` });
  //   }
  // }

  // // Here we need to use an arrow function to bind `this` correctly
  // validatePatchEmail = async (
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction
  // ) => {
  //   if (req.body.email) {
  //     log('Validating email', req.body.email);

  //     this.validateSameEmailBelongToSameTeam(req, res, next);
  //   } else {
  //     next();
  //   }
  // };

  async validateTeamExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const team = await teamsService.readById(req.params.teamId);
    if (team) {
      next();
    } else {
      res.status(404).send({ error: `Team ${req.params.teamId} not found` });
    }
  }

  async extractTeamId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    req.body.id = req.params.teamId;
    next();
  }
}

export default new TeamsMiddleware();
