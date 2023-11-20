import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokensView } from '../../../modules/auth/views/tokens.view';
import { TokenTypeEnum } from '../enums/tokens.enum';
import { settings } from '../../configurations/settings.config';
import { environmentConstant } from '../../constants/environment.constant';

@Injectable()
export class TokensFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getPairTokens(userId: string): Promise<TokensView> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(userId, TokenTypeEnum.AccessToken),
      this.generateToken(userId, TokenTypeEnum.RefreshToken),
    ]);
    return { accessToken, refreshToken };
  }

  private generateToken(
    userId: string,
    tokenType: TokenTypeEnum,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId,
      },
      {
        secret: this.configService.get(environmentConstant.secret[tokenType]),
        expiresIn: settings.ttl[tokenType],
      },
    );
  }

  async checkToken(token: string, tokenType: TokenTypeEnum) {
    return this.jwtService.verify(token, {
      secret: this.configService.get(environmentConstant.secret[tokenType]),
      ignoreExpiration: false,
    });
  }
}
