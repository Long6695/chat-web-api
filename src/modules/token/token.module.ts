import { Module } from '@nestjs/common';
import { TokenService } from 'src/modules/token/token.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
