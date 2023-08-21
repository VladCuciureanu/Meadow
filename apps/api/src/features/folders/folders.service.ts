import { Repository } from "typeorm";
import { Folder } from "./folder.model";
import { MeadowDataSource } from "../../config/typeorm";
import { z } from "zod";
import {
  CreateFolderSchema,
  PatchFolderSchema,
  UpdateFolderSchema,
  User,
} from "@meadow/shared";

class FoldersService {
  foldersRepository: Repository<Folder>;

  constructor() {
    this.foldersRepository = MeadowDataSource.getRepository(Folder);
  }

  async getMany(limit: number, page: number, user: User) {
    const skipCount = Math.max(0, limit * (page - 1));
    return this.foldersRepository.find({
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

  async getById(folderId: string) {
    return this.foldersRepository.findOne({
      where: {
        id: folderId,
      },
    });
  }

  async create(dto: z.infer<typeof CreateFolderSchema>) {
    return this.foldersRepository.create(dto.body);
  }

  async patch(dto: z.infer<typeof PatchFolderSchema>) {
    return this.foldersRepository.update({ id: dto.params.folderId }, dto.body);
  }

  async put(dto: z.infer<typeof UpdateFolderSchema>) {
    return this.foldersRepository.update({ id: dto.params.folderId }, dto.body);
  }

  async delete(folderId: string) {
    return this.foldersRepository.delete({ id: folderId });
  }
}

export default new FoldersService();
