import { ArrayContains, Repository } from "typeorm";
import { TeamEntity } from "./teams.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateTeamRequest,
  CreateTeamResponse,
  DeleteTeamRequest,
  GetTeamRequest,
  GetTeamResponse,
  GetTeamsRequest,
  GetTeamsResponse,
  UpdateTeamRequest,
  UpdateTeamResponse,
  UserDto,
} from "@meadow/shared";
import { TeamsMapper } from "./teams.mapper";

class TeamsService {
  teamsRepository: Repository<TeamEntity>;

  constructor() {
    this.teamsRepository = MeadowDataSource.getRepository(TeamEntity);
  }

  async getTeams(
    dto: GetTeamsRequest,
    currentUser: UserDto
  ): Promise<GetTeamsResponse> {
    const skipCount = dto.limit * (dto.page - 1);

    const entities = await this.teamsRepository.find({
      where: {
        members: ArrayContains([{ id: currentUser.id }]),
      },
      take: dto.limit,
      skip: skipCount,
    });

    return entities.map((entity) => TeamsMapper.toDto(entity));
  }

  async getTeamById(dto: GetTeamRequest): Promise<GetTeamResponse> {
    const entity = await this.teamsRepository.findOne({
      where: { id: dto.id },
      relations: ["members"],
    });

    return TeamsMapper.toDto(entity!);
  }

  async createTeam(
    dto: CreateTeamRequest,
    currentUser: UserDto
  ): Promise<CreateTeamResponse> {
    const entity = await this.teamsRepository.save(
      this.teamsRepository.create({
        name: dto.name,
        imgUrl: dto.imgUrl,
        members: [{ id: currentUser.id }],
      })
    );

    return TeamsMapper.toDto(entity);
  }

  async updateTeam(dto: UpdateTeamRequest): Promise<UpdateTeamResponse> {
    let updatedFields: Record<string, any> = {};

    if (dto.name) {
      updatedFields.name = dto.name;
    }
    if (dto.imgUrl) {
      updatedFields.imgUrl = dto.imgUrl;
    }

    const updateResponse = await this.teamsRepository.update(
      {
        id: dto.id,
      },
      updatedFields
    );

    const updatedEntity = updateResponse.generatedMaps.at(0) as TeamEntity;

    return TeamsMapper.toDto(updatedEntity);
  }

  async deleteTeam(dto: DeleteTeamRequest) {
    await this.teamsRepository.delete({ id: dto.id });
  }

  async isUserInTeam(teamId: string, user: UserDto) {
    // TODO: Rename method later on - maybe refactor to return role
    const team = await this.getTeamById({ id: teamId });

    return team?.members.find((member) => member.id === user.id) !== undefined;
  }
}

export default new TeamsService();
