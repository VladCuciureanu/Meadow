import { Repository } from "typeorm";
import { FolderEntity } from "./folders.entity";
import { MeadowDataSource } from "../../config/typeorm";
import {
  CreateFolderRequest,
  CreateFolderResponse,
  DeleteFolderRequest,
  GetFolderRequest,
  GetFolderResponse,
  GetFoldersResponse,
  GetSpacesRequest,
  UpdateFolderRequest,
  UpdateFolderResponse,
  UserDto,
} from "@meadow/shared";
import { FoldersMapper } from "./folders.mapper";

class FoldersService {
  foldersRepository: Repository<FolderEntity>;

  constructor() {
    this.foldersRepository = MeadowDataSource.getRepository(FolderEntity);
  }

  async getFolders(
    dto: GetSpacesRequest,
    currentUser: UserDto
  ): Promise<GetFoldersResponse> {
    const skipCount = dto.limit * (dto.page - 1);

    const entities = await this.foldersRepository.find({
      take: dto.limit,
      skip: skipCount,
      where: {
        space: {
          team: {
            members: {
              id: currentUser.id,
            },
          },
        },
      },
      relations: ["space", "parentFolder"],
    });

    return entities.map((entity) => FoldersMapper.toDto(entity));
  }

  async getFolderById(dto: GetFolderRequest): Promise<GetFolderResponse> {
    const entity = await this.foldersRepository.findOne({
      where: { id: dto.id },
    });

    return FoldersMapper.toDto(entity!);
  }

  async createFolder(dto: CreateFolderRequest): Promise<CreateFolderResponse> {
    const entity = await this.foldersRepository.save(
      this.foldersRepository.create({
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
      })
    );

    return FoldersMapper.toDto(entity);
  }

  async updateFolder(dto: UpdateFolderRequest): Promise<UpdateFolderResponse> {
    let updatedFields: Record<string, any> = {};

    if (dto.name) {
      updatedFields.name = dto.name;
    }
    if (dto.description) {
      updatedFields.description = dto.description;
    }
    if (dto.icon) {
      updatedFields.icon = {};
      if (dto.icon.tintColor) {
        updatedFields.icon.tintColor = dto.icon.tintColor;
      }
      if (dto.icon.type) {
        updatedFields.icon.type = dto.icon.type;
      }
      if (dto.icon.value) {
        updatedFields.icon.value = dto.icon.value;
      }
    }
    if (dto.parentFolderId) {
      updatedFields.parentFolder = { id: dto.parentFolderId }; // TODO: validate parent folder is in space
    }
    if (dto.spaceId) {
      updatedFields.space = { id: dto.spaceId };
    }

    const updateResponse = await this.foldersRepository.update(
      {
        id: dto.id,
      },
      updatedFields
    );

    const updatedEntity = updateResponse.generatedMaps.at(0) as FolderEntity;

    return FoldersMapper.toDto(updatedEntity);
  }

  async deleteFolder(dto: DeleteFolderRequest) {
    await this.foldersRepository.delete({ id: dto.id });
  }
}

export default new FoldersService();
