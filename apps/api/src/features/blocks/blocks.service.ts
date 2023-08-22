import { Repository } from "typeorm";
import { BlockEntity } from "./block.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateBlockDto,
  DeleteBlockDto,
  PatchBlockDto,
  UpdateBlockDto,
  User,
} from "@meadow/shared";

class BlocksService {
  blocksRepository: Repository<BlockEntity>;

  constructor() {
    this.blocksRepository = MeadowDataSource.getRepository(BlockEntity);
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

  async create(dto: CreateBlockDto) {
    const block = this.blocksRepository.create({
      type: dto.type,
      listStyle: dto.listStyle,
      color: dto.color,
      document: { id: dto.documentId },
      space: { id: dto.spaceId },
      hasBlockDecoration: dto.hasBlockDecoration,
      hasFocusDecoration: dto.hasFocusDecoration,
      indentationLevel: dto.indentationLevel,
    });
    return this.blocksRepository.save(block);
  }

  async patch(dto: PatchBlockDto) {
    return this.blocksRepository.update(
      { id: dto.id },
      {
        type: dto.type,
        listStyle: dto.listStyle,
        color: dto.color,
        document: { id: dto.documentId },
        space: { id: dto.spaceId },
        hasBlockDecoration: dto.hasBlockDecoration,
        hasFocusDecoration: dto.hasFocusDecoration,
        indentationLevel: dto.indentationLevel,
      }
    );
  }

  async put(dto: UpdateBlockDto) {
    return this.blocksRepository.update(
      { id: dto.id },
      {
        type: dto.type,
        listStyle: dto.listStyle,
        color: dto.color,
        document: { id: dto.documentId },
        space: { id: dto.spaceId },
        hasBlockDecoration: dto.hasBlockDecoration,
        hasFocusDecoration: dto.hasFocusDecoration,
        indentationLevel: dto.indentationLevel,
      }
    );
  }

  async delete(dto: DeleteBlockDto) {
    return this.blocksRepository.delete({ id: dto.id });
  }
}

export default new BlocksService();
