import { Repository } from "typeorm";
import { Team } from "./team.model";
import { MeadowDataSource } from "../../config/typeorm";

class TeamsService {
  teamsRepository: Repository<Team>;
  constructor() {
    this.teamsRepository = MeadowDataSource.getRepository(Team);
  }
  // async create(resource: TeamDto) {
  //   return TeamsDao.addTeam(resource);
  // }

  // async deleteById(resourceId: string) {
  //   return TeamsDao.removeTeamById(resourceId);
  // }

  async list(limit: number, page: number) {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.teamsRepository.find({ take: limit, skip: skipCount });
  }

  // async patchById(resource: TeamDto) {
  //   return TeamsDao.patchTeamById(resource);
  // }

  async readById(resourceId: string) {
    return this.teamsRepository.findOne({ where: { id: resourceId } });
  }

  // async updateById(resource: TeamDto) {
  //   return TeamsDao.putTeamById(resource);
  // }

  // async getTeamByEmail(email: string) {
  //   return TeamsDao.getTeamByEmail(email);
  // }
}

export default new TeamsService();
