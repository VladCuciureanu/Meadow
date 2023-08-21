import { Repository, DeepPartial } from "typeorm";
import { Folder } from "./folder.model";
import { MeadowDataSource } from "../../config/typeorm";
import { z } from "zod";
import {
  CreateFolderSchema,
  DeleteFolderSchema,
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
      relations: ["space", "parentFolder"],
    });
  }

  async getById(folderId: string) {
    return this.foldersRepository.findOne({
      where: {
        id: folderId,
      },
      relations: ["space", "parentFolder"],
    });
  }

  async create(dto: z.infer<typeof CreateFolderSchema>) {
    const payload: DeepPartial<Folder> = dto.body;

    payload.space = { id: payload.spaceId };
    payload.parentFolder = { id: payload.parentFolderId };
    payload.itemOrder = [];

    const folder = this.foldersRepository.create(payload);
    return this.foldersRepository.save(folder);
  }

  async patch(dto: z.infer<typeof PatchFolderSchema>) {
    const payload: DeepPartial<Folder> = dto.body;

    if (payload.spaceId) {
      payload.space = { id: payload.spaceId };
      delete payload.spaceId;
    }
    if (payload.parentFolderId) {
      payload.parentFolder = { id: payload.parentFolderId };
      delete payload.parentFolderId;
    }

    return this.foldersRepository.update({ id: dto.params.folderId }, payload);
  }

  async put(dto: z.infer<typeof UpdateFolderSchema>) {
    const payload: DeepPartial<Folder> = dto.body;

    payload.space = { id: payload.spaceId };
    delete payload.spaceId;
    payload.parentFolder = { id: payload.parentFolderId };
    delete payload.parentFolderId;

    return this.foldersRepository.update({ id: dto.params.folderId }, payload);
  }

  async delete(dto: z.infer<typeof DeleteFolderSchema>) {
    return this.foldersRepository.delete({ id: dto.params.folderId });
  }
}

export default new FoldersService();
