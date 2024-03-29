import { ApiProperty } from '@nestjs/swagger';

export class RecipientUserDto {
  @ApiProperty()
  recipient_Email: string;
}
