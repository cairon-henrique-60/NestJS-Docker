import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateUsersDto } from "./create-users.dto";

export class UpdateUserDto extends PartialType(CreateUsersDto) {
    @IsString()
    readonly name?: string;
    @IsString()
    readonly role?: string;
    @IsString({ each: true })
    readonly courses?: string[];
}