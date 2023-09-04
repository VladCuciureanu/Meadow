import { Repository } from "typeorm";
import { TeamEntity } from "./team.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateTeamRequest,
  CreateTeamResponse,
  DeleteTeamRequest,
  GetTeamRequest,
  GetTeamsRequest,
  GetTeamsResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from "@meadow/shared";

class TeamsService {
  teamsRepository: Repository<TeamEntity>;

  constructor() {
    this.teamsRepository = MeadowDataSource.getRepository(TeamEntity);
  }

  async getTeams(dto: GetTeamsRequest): GetTeamsResponse {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.teamsRepository.find({ take: limit, skip: skipCount });
  }

  async getTeamById(dto: GetTeamRequest): GetTeamsResponse {
    return this.teamsRepository.findOne({
      where: { id: teamId },
      relations: ["members"],
    });
  }

  async createTeam(dto: CreateTeamRequest): CreateTeamResponse {
    const team = this.teamsRepository.create({
      name: dto.name,
      imgUrl: dto.imgUrl,
      members: [{ id: dto.creatorId }],
    });
    return this.teamsRepository.save(team);
  }

  async updateTeam(dto: UpdateTeamRequest): UpdateTeamResponse {
    return this.teamsRepository.update(
      { id: dto.id },
      { name: dto.name, imgUrl: dto.imgUrl }
    );
  }

  async deleteTeam(dto: DeleteTeamRequest) {
    return this.teamsRepository.delete({ id: dto.id });
  }
}

export default new TeamsService();
