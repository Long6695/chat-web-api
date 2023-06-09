import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CookieOptions, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
  };

  public setAccessTokenToCookie(accessToken: string, res: Response) {
    if (this.configService.get('env.nodeEnv') === 'production')
      this.cookiesOptions.secure = true;

    const accessTokenCookieOptions: CookieOptions = {
      ...this.cookiesOptions,
      expires: new Date(
        Date.now() +
          this.configService.get('env.token.accessToken.expirationTime') *
            60 *
            1000,
      ),
      maxAge:
        this.configService.get('env.token.accessToken.expirationTime') *
        60 *
        1000,
    };

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  }

  private setRefreshTokenToCookie(refreshToken: string, res: Response) {
    const refreshTokenCookieOptions: CookieOptions = {
      ...this.cookiesOptions,
      expires: new Date(
        Date.now() +
          this.configService.get('env.token.refreshToken.expirationTime') *
            60 *
            1000,
      ),
      maxAge:
        this.configService.get('env.token.refreshToken.expirationTime') *
        60 *
        1000,
    };

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    res.cookie('loggedIn', true, {
      ...refreshTokenCookieOptions,
      httpOnly: false,
    });
  }

  public setTokensToCookie(
    accessToken: string,
    refreshToken: string,
    res: Response,
  ) {
    this.setAccessTokenToCookie(accessToken, res);
    this.setRefreshTokenToCookie(refreshToken, res);
  }

  public generateTokens(payload: { email: string; sub: string }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('env.token.accessToken.secret'),
      expiresIn: `${this.configService.get(
        'env.token.accessToken.expirationTime',
      )}m`,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('env.token.refreshToken.secret'),
      expiresIn: `${this.configService.get(
        'env.token.refreshToken.expirationTime',
      )}m`,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async setCurrentRefreshToken(userId: string, refreshToken: string) {
    const hashRT = await this.hashRefreshToken(refreshToken);
    return this.userService.update(userId, {
      hashRT,
    });
  }

  async removeRefreshToken(userId: string) {
    await this.userService.update(userId, {
      hashRT: null,
    });
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('env.token.accessToken.secret'),
    });
    if (payload.userId) {
      return this.userService.findOne({
        where: {
          id: payload.userId,
        },
      });
    }
  }

  async hashRefreshToken(refreshToken: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(refreshToken, salt);
  }
}
