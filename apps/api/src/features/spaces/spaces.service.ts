import { Repository } from "typeorm";
import { Space } from "./space.model";
import { MeadowDataSource } from "../../config/typeorm";

class SpacesService {
  spacesRepository: Repository<Space>;

  constructor() {
    this.spacesRepository = MeadowDataSource.getRepository(Space);
  }
  // async create(resource: SpaceDto) {
  //   return SpacesDao.addSpace(resource);
  // }

  // async deleteById(resourceId: string) {
  //   return SpacesDao.removeSpaceById(resourceId);
  // }

  // async list(limit: number, page: number) {
  //   return SpacesDao.getSpaces();
  // }

  // async patchById(resource: SpaceDto) {
  //   return SpacesDao.patchSpaceById(resource);
  // }

  async readById(resourceId: string) {
    return this.spacesRepository.findOne({ where: { id: resourceId } });
  }

  // async updateById(resource: SpaceDto) {
  //   return SpacesDao.putSpaceById(resource);
  // }

  // async getSpaceByEmail(email: string) {
  //   return SpacesDao.getSpaceByEmail(email);
  // }
}

export default new SpacesService();
