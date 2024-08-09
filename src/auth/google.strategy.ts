import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: '468314714119-vhgu5gege9ubtl3i4rn8jeltk481mbml.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    console.log('Profile:', profile);
  
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    const payload = {
      user,
      accessToken,
    };
  
    done(null, payload);
  }
}
