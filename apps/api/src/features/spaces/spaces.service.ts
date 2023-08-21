import { Repository, DeepPartial } from "typeorm";
import { Space } from "./space.model";
import { MeadowDataSource } from "../../config/typeorm";
import { z } from "zod";
import {
  CreateSpaceSchema,
  DeleteSpaceSchema,
  PatchSpaceSchema,
  UpdateSpaceSchema,
} from "@meadow/shared";

class SpacesService {
  spacesRepository: Repository<Space>;

  constructor() {
    this.spacesRepository = MeadowDataSource.getRepository(Space);
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

  async create(dto: z.infer<typeof CreateSpaceSchema>) {
    const payload: DeepPartial<Space> = {
      ...dto.body,
    };

    payload.team = { id: dto.body.teamId };

    const space = this.spacesRepository.create(payload);
    return this.spacesRepository.save(space);
  }

  async patch(dto: z.infer<typeof PatchSpaceSchema>) {
    const payload: DeepPartial<Space> = {
      ...dto.body,
    };

    if (payload.teamId) {
      payload.team = { id: payload.teamId };
      delete payload.teamId;
    }

    return this.spacesRepository.update({ id: dto.params.spaceId }, payload);
  }

  async put(dto: z.infer<typeof UpdateSpaceSchema>) {
    const payload: DeepPartial<Space> = {
      ...dto.body,
    };

    if (payload.teamId) {
      payload.team = { id: payload.teamId };
    }

    return this.spacesRepository.update({ id: dto.params.spaceId }, payload);
  }

  async delete(dto: z.infer<typeof DeleteSpaceSchema>) {
    return this.spacesRepository.delete({ id: dto.params.spaceId });
  }
}

export default new SpacesService();
