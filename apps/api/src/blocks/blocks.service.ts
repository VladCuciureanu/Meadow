import { Repository } from "typeorm";
import { MeadowDataSource } from "../data-source";
import { Block } from "./models/block";

class BlocksService {
  blocksRepository: Repository<Block>;

  constructor() {
    this.blocksRepository = MeadowDataSource.getRepository(Block);
  }
  // async create(resource: BlockDto) {
  //   return BlocksDao.addBlock(resource);
  // }

  // async deleteById(resourceId: string) {
  //   return BlocksDao.removeBlockById(resourceId);
  // }

  // async list(limit: number, page: number) {
  //   return BlocksDao.getBlocks();
  // }

  // async patchById(resource: BlockDto) {
  //   return BlocksDao.patchBlockById(resource);
  // }

  async readById(resourceId: string) {
    return this.blocksRepository.findOne({ where: { id: resourceId } });
  }

  // async updateById(resource: BlockDto) {
  //   return BlocksDao.putBlockById(resource);
  // }

  // async getBlockByEmail(email: string) {
  //   return BlocksDao.getBlockByEmail(email);
  // }
}

export default new BlocksService();
