import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: configService.get('env.token.refreshToken.secret'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload) {
    const refreshToken = request.cookies?.refreshToken;
    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
  }
}
