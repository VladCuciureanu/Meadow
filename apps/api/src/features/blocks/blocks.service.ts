import { Repository } from "typeorm";
import { BlockEntity } from "./blocks.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateBlockRequest,
  CreateBlockResponse,
  DeleteBlockRequest,
  GetBlockRequest,
  GetBlockResponse,
  GetBlocksResponse,
  GetSpacesRequest,
  UpdateBlockRequest,
  UpdateBlockResponse,
  UserDto,
} from "@meadow/shared";
import { BlocksMapper } from "./blocks.mapper";
import documentsService from "../documents/documents.service";

class BlocksService {
  blocksRepository: Repository<BlockEntity>;

  constructor() {
    this.blocksRepository = MeadowDataSource.getRepository(BlockEntity);
  }

  async getBlocks(
    dto: GetSpacesRequest,
    currentUser: UserDto
  ): Promise<GetBlocksResponse> {
    const skipCount = dto.limit * (dto.page - 1);

    const entities = await this.blocksRepository.find({
      take: dto.limit,
      skip: skipCount,
      where: {
        // TODO
      },
      relations: ["todo"],
    });

    return entities.map((entity) => BlocksMapper.toDto(entity));
  }

  async getBlockById(dto: GetBlockRequest): Promise<GetBlockResponse> {
    const entity = await this.blocksRepository.findOne({
      where: { id: dto.id },
    });

    return BlocksMapper.toDto(entity!);
  }

  async createBlock(dto: CreateBlockRequest): Promise<CreateBlockResponse> {
    const entity = await this.blocksRepository.save(
      this.blocksRepository.create({
        // TODO
      })
    );

    return BlocksMapper.toDto(entity);
  }

  async updateBlock(dto: UpdateBlockRequest): Promise<UpdateBlockResponse> {
    let updatedFields: Record<string, any> = {};

    // TODO

    const updateResponse = await this.blocksRepository.update(
      {
        id: dto.id,
      },
      updatedFields
    );

    const updatedEntity = updateResponse.generatedMaps.at(0) as BlockEntity;

    return BlocksMapper.toDto(updatedEntity);
  }

  async deleteBlock(dto: DeleteBlockRequest) {
    await this.blocksRepository.delete({ id: dto.id });
  }

  async isUserAuthorized(blockId: string, user: UserDto) {
    const block = await this.blocksRepository.findOne({
      where: { id: blockId },
      relations: ["document"],
    });

    if (!block || !block.document) {
      return false;
    }

    return documentsService.isUserAuthorized(block.document.id, user);
  }
}

export default new BlocksService();
