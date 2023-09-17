import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { User } from './entities/User';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  prisma = new PrismaClient();
  signIn(userLogin) {
    // TODO: write logic for login
    const token = this.jwtService.signAsync(
      { data: 'data' },
      { secret: this.configService.get('KEY'), expiresIn: '15m' },
    );

    return token;
  }

  async signUp(userSignUp: User) {
    try {
      const { userId, name, email, password, phone, birthday, gender, role } =
        userSignUp;

      const checkUser = await this.prisma.user.findFirst({ where: { email } });

      if (checkUser) {
        throw new Error('Existing User!');
      }

      const newUser: Prisma.userCreateInput = {
        ...userSignUp,
        userId: Number(userId),
        password: bcrypt.hashSync(password, 10),
      };
      await this.prisma.user.create({ data: newUser });
      const message = 'Signup successfully. Please sign in!';
      return {
        success: true,
        message,
        data: newUser,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
