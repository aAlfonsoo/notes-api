import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, firstName: string, lastName: string, picture: string) {
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({
        email,
        firstName,
        lastName,
        picture,
      });
    }
    return this.generateJwtToken(user);
  }

  generateJwtToken(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
