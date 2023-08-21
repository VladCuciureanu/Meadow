import { Repository } from "typeorm";
import { Block } from "./block.model";
import { MeadowDataSource } from "../../config/typeorm";
import { z } from "zod";
import {
  CreateBlockSchema,
  PatchBlockSchema,
  UpdateBlockSchema,
  User,
} from "@meadow/shared";

class BlocksService {
  blocksRepository: Repository<Block>;

  constructor() {
    this.blocksRepository = MeadowDataSource.getRepository(Block);
  }

  async getMany(limit: number, page: number, user: User) {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.blocksRepository.find({
      take: limit,
      skip: skipCount,
      where: {
        space: {
          team: {
            members: {
              id: user.id,
            },
          },
        },
      },
    });
  }

  async getById(blockId: string) {
    return this.blocksRepository.findOne({
      where: {
        id: blockId,
      },
    });
  }

  async create(dto: z.infer<typeof CreateBlockSchema>) {
    return this.blocksRepository.create(dto.body);
  }

  async patch(dto: z.infer<typeof PatchBlockSchema>) {
    return this.blocksRepository.update({ id: dto.params.blockId }, dto.body);
  }

  async put(dto: z.infer<typeof UpdateBlockSchema>) {
    return this.blocksRepository.update({ id: dto.params.blockId }, dto.body);
  }

  async delete(blockId: string) {
    return this.blocksRepository.delete({ id: blockId });
  }
}

export default new BlocksService();
