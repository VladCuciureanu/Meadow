import { Repository } from "typeorm";
import { MeadowDataSource } from "../data-source";
import { User } from "./models/user";

class UsersService {
  usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = MeadowDataSource.getRepository(User);
  }
  // async create(resource: UserDto) {
  //   return UsersDao.addUser(resource);
  // }

  // async deleteById(resourceId: string) {
  //   return UsersDao.removeUserById(resourceId);
  // }

  // async list(limit: number, page: number) {
  //   return UsersDao.getUsers();
  // }

  // async patchById(resource: UserDto) {
  //   return UsersDao.patchUserById(resource);
  // }

  async readById(resourceId: string) {
    return this.usersRepository.findOne({ where: { id: resourceId } });
  }

  // async updateById(resource: UserDto) {
  //   return UsersDao.putUserById(resource);
  // }

  // async getUserByEmail(email: string) {
  //   return UsersDao.getUserByEmail(email);
  // }
}

export default new UsersService();
