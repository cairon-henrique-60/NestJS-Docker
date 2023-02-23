import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GeneralService } from "src/tools/globalService/crud";
import { FindManyOptions, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService extends GeneralService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
      super(userRepository)  
    }
}