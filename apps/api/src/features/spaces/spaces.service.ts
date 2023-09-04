import { Repository } from "typeorm";
import { SpaceEntity } from "./spaces.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateSpaceDto,
  DeleteSpaceDto,
  PatchSpaceDto,
  UpdateSpaceDto,
} from "@meadow/shared";

class SpacesService {
  spacesRepository: Repository<SpaceEntity>;

  constructor() {
    this.spacesRepository = MeadowDataSource.getRepository(SpaceEntity);
  }

  async getMany(limit: number, page: number) {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.spacesRepository.find({
      take: limit,
      skip: skipCount,
      relations: ["team"],
    });
  }

  async getById(spaceId: string) {
    return this.spacesRepository.findOne({
      where: { id: spaceId },
      relations: ["team"],
    });
  }

  async create(dto: CreateSpaceDto) {
    const space = this.spacesRepository.create({
      name: dto.name,
      imgUrl: dto.imgUrl,
      team: {
        id: dto.teamId,
      },
    });
    return this.spacesRepository.save(space);
  }

  async patch(dto: PatchSpaceDto) {
    return this.spacesRepository.update(
      { id: dto.id },
      {
        name: dto.name,
        imgUrl: dto.imgUrl,
        team: {
          id: dto.teamId,
        },
      }
    );
  }

  async put(dto: UpdateSpaceDto) {
    return this.spacesRepository.update(
      { id: dto.id },
      {
        name: dto.name,
        imgUrl: dto.imgUrl,
        team: {
          id: dto.teamId,
        },
      }
    );
  }

  async delete(dto: DeleteSpaceDto) {
    return this.spacesRepository.delete({ id: dto.id });
  }
}

export default new SpacesService();
