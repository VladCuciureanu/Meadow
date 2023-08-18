import { Repository } from "typeorm";
import { Folder } from "./folder.model";
import { MeadowDataSource } from "../../config/typeorm";

class FoldersService {
  foldersRepository: Repository<Folder>;

  constructor() {
    this.foldersRepository = MeadowDataSource.getRepository(Folder);
  }
  // async create(resource: FolderDto) {
  //   return FoldersDao.addFolder(resource);
  // }

  // async deleteById(resourceId: string) {
  //   return FoldersDao.removeFolderById(resourceId);
  // }

  // async list(limit: number, page: number) {
  //   return FoldersDao.getFolders();
  // }

  // async patchById(resource: FolderDto) {
  //   return FoldersDao.patchFolderById(resource);
  // }

  async readById(resourceId: string) {
    return this.foldersRepository.findOne({ where: { id: resourceId } });
  }

  // async updateById(resource: FolderDto) {
  //   return FoldersDao.putFolderById(resource);
  // }

  // async getFolderByEmail(email: string) {
  //   return FoldersDao.getFolderByEmail(email);
  // }
}

export default new FoldersService();
