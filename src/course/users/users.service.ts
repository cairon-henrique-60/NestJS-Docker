import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GeneralService } from "src/tools/globalService/crud";
import { FindManyOptions, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUsersDto } from "./dto/create-users.dto";

class UserDto {
    readonly findAll: () => {};
    readonly findOne: (id: string) => {};
    readonly create: (props: CreateUsersDto) => Promise<void>;
    readonly update: (id: string, props: CreateUsersDto) => Promise<void>;
    readonly deleteProps: (id: string) => Promise<void>;
}

@Injectable()
export class UserService extends GeneralService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
      super(userRepository)  
    }
}