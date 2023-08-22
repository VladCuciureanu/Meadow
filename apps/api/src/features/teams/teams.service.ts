import { Repository } from "typeorm";
import { TeamEntity } from "./team.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateTeamDto,
  DeleteTeamDto,
  PatchTeamDto,
  UpdateTeamDto,
} from "@meadow/shared";

class TeamsService {
  teamsRepository: Repository<TeamEntity>;

  constructor() {
    this.teamsRepository = MeadowDataSource.getRepository(TeamEntity);
  }

  async getMany(limit: number, page: number) {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.teamsRepository.find({ take: limit, skip: skipCount });
  }

  async getById(teamId: string) {
    return this.teamsRepository.findOne({
      where: { id: teamId },
      relations: ["members"],
    });
  }

  async create(dto: CreateTeamDto) {
    const team = this.teamsRepository.create({
      name: dto.name,
      imgUrl: dto.imgUrl,
      members: [{ id: dto.creatorId }],
    });
    return this.teamsRepository.save(team);
  }

  async patch(dto: PatchTeamDto) {
    return this.teamsRepository.update(
      { id: dto.id },
      { name: dto.name, imgUrl: dto.imgUrl }
    );
  }

  async put(dto: UpdateTeamDto) {
    return this.teamsRepository.update(
      { id: dto.id },
      { name: dto.name, imgUrl: dto.imgUrl }
    );
  }

  async delete(dto: DeleteTeamDto) {
    return this.teamsRepository.delete({ id: dto.id });
  }
}

export default new TeamsService();
