import { IsString } from "class-validator";

export class CreateUsersDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly role: string;
    @IsString({ each: true })
    readonly courses?: string[];
}
