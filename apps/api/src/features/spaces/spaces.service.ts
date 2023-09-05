import { ArrayContains, Repository } from "typeorm";
import { SpaceEntity } from "./spaces.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateSpaceRequest,
  CreateSpaceResponse,
  DeleteSpaceRequest,
  GetSpaceRequest,
  GetSpaceResponse,
  GetSpacesRequest,
  GetSpacesResponse,
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  UserDto,
} from "@meadow/shared";
import { SpacesMapper } from "./spaces.mapper";
import teamsService from "../teams/teams.service";

class SpacesService {
  spacesRepository: Repository<SpaceEntity>;

  constructor() {
    this.spacesRepository = MeadowDataSource.getRepository(SpaceEntity);
  }

  async getSpaces(
    dto: GetSpacesRequest,
    currentUser: UserDto
  ): Promise<GetSpacesResponse> {
    const skipCount = dto.limit * (dto.page - 1);

    const entities = await this.spacesRepository.find({
      where: {
        team: {
          members: ArrayContains([{ id: currentUser.id }]),
        },
      },
      take: dto.limit,
      skip: skipCount,
    });

    return entities.map((entity) => SpacesMapper.toDto(entity));
  }

  async getSpaceById(dto: GetSpaceRequest): Promise<GetSpaceResponse> {
    const entity = await this.spacesRepository.findOne({
      where: { id: dto.id },
    });

    return SpacesMapper.toDto(entity!);
  }

  async createSpace(dto: CreateSpaceRequest): Promise<CreateSpaceResponse> {
    const entity = await this.spacesRepository.save(
      this.spacesRepository.create({
        name: dto.name,
        imgUrl: dto.imgUrl,
        team: { id: dto.teamId },
      })
    );

    return SpacesMapper.toDto(entity);
  }

  async updateSpace(dto: UpdateSpaceRequest): Promise<UpdateSpaceResponse> {
    let updatedFields: Record<string, any> = {};

    if (dto.name) {
      updatedFields.name = dto.name;
    }
    if (dto.imgUrl) {
      updatedFields.imgUrl = dto.imgUrl;
    }
    if (dto.teamId) {
      updatedFields.team = {
        id: dto.teamId,
      };
    }

    const updateResponse = await this.spacesRepository.update(
      {
        id: dto.id,
      },
      updatedFields
    );

    const updatedEntity = updateResponse.generatedMaps.at(0) as SpaceEntity;

    return SpacesMapper.toDto(updatedEntity);
  }

  async deleteSpace(dto: DeleteSpaceRequest) {
    await this.spacesRepository.delete({ id: dto.id });
  }

  async isUserAuthorized(spaceId: string, user: UserDto) {
    const space = await this.spacesRepository.findOne({
      where: { id: spaceId },
      relations: ["team"],
    });

    if (space) {
      return teamsService.isUserInTeam(space?.team.id, user);
    }

    return false;
  }
}

export default new SpacesService();
