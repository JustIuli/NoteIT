import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @Length(5, 35)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
