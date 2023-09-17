import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty } from '@nestjs/swagger';

import { User } from './entities/User';

class UserLoginType {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signIn')
  signIn(@Body() body: UserLoginType) {
    return this.authService.signIn(body);
  }

  @Post('/signUp')
  async signUp(@Body() body: User) {
    return this.authService.signUp(body);
  }
}
