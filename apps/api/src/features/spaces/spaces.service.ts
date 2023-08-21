import { Repository } from "typeorm";
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
    return this.spacesRepository.find({ take: limit, skip: skipCount });
  }

  async getById(spaceId: string) {
    return this.spacesRepository.findOne({ where: { id: spaceId } });
  }

  async create(dto: z.infer<typeof CreateSpaceSchema>) {
    const space = this.spacesRepository.create(dto.body);
    return this.spacesRepository.save(space);
  }

  async patch(dto: z.infer<typeof PatchSpaceSchema>) {
    return this.spacesRepository.update({ id: dto.params.spaceId }, dto.body);
  }

  async put(dto: z.infer<typeof UpdateSpaceSchema>) {
    return this.spacesRepository.update({ id: dto.params.spaceId }, dto.body);
  }

  async delete(dto: z.infer<typeof DeleteSpaceSchema>) {
    return this.spacesRepository.delete({ id: dto.params.spaceId });
  }
}

export default new SpacesService();
