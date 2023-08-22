import { Repository } from "typeorm";
import { Folder } from "./folder.model";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateFolderDto,
  DeleteFolderDto,
  PatchFolderDto,
  UpdateFolderDto,
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

  async create(dto: CreateFolderDto) {
    const folder = this.foldersRepository.create({
      name: dto.name,
      description: dto.description,
      icon: dto.icon,
      itemOrder: [],
      parentFolder: {
        id: dto.parentFolderId,
      },
      space: {
        id: dto.spaceId,
      },
    });
    return this.foldersRepository.save(folder);
  }

  async patch(dto: PatchFolderDto) {
    return this.foldersRepository.update(
      { id: dto.id },
      {
        name: dto.name,
        description: dto.description,
        icon: dto.icon,
        itemOrder: dto.itemOrder,
        parentFolder: {
          id: dto.parentFolderId,
        },
        space: {
          id: dto.spaceId,
        },
      }
    );
  }

  async put(dto: UpdateFolderDto) {
    return this.foldersRepository.update(
      { id: dto.id },
      {
        name: dto.name,
        description: dto.description,
        icon: dto.icon,
        itemOrder: dto.itemOrder,
        parentFolder: {
          id: dto.parentFolderId,
        },
        space: {
          id: dto.spaceId,
        },
      }
    );
  }

  async delete(dto: DeleteFolderDto) {
    return this.foldersRepository.delete({ id: dto.id });
  }
}

export default new FoldersService();
