import { IsNotEmpty, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginUserDto {
  @IsNotEmpty()
  @Length(5, 35)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;
}
