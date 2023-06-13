import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from 'src/modules/token/token.service';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
