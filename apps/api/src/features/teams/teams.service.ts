import { Repository } from "typeorm";
import { Team } from "./team.model";
import { MeadowDataSource } from "../../config/typeorm";
import { z } from "zod";
import {
  CreateTeamSchema,
  PatchTeamSchema,
  UpdateTeamSchema,
  User,
} from "@meadow/shared";

class TeamsService {
  teamsRepository: Repository<Team>;

  constructor() {
    this.teamsRepository = MeadowDataSource.getRepository(Team);
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

  async create(dto: z.infer<typeof CreateTeamSchema>, user: User) {
    const team = this.teamsRepository.create({
      ...dto.body,
      members: [{ id: user.id }],
    });
    return this.teamsRepository.save(team);
  }

  async patch(dto: z.infer<typeof PatchTeamSchema>) {
    return this.teamsRepository.update({ id: dto.params.teamId }, dto.body);
  }

  async put(dto: z.infer<typeof UpdateTeamSchema>) {
    return this.teamsRepository.update({ id: dto.params.teamId }, dto.body);
  }

  async delete(teamId: string) {
    return this.teamsRepository.delete({ id: teamId });
  }
}

export default new TeamsService();
