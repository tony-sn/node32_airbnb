import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  role: string;
}
