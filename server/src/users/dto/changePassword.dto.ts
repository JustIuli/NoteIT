import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @Length(8, 200)
  @ApiProperty()
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  userEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  secretCode: string;
}
