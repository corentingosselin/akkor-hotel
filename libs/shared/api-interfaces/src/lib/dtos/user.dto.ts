import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { UserRole } from "../interfaces/user.interface";

export class UpdateUserDto {
    @IsNumber()
    id!: number;
    
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    pseudo?: string;

    @IsString()
    @IsOptional()
    role?: UserRole;
}