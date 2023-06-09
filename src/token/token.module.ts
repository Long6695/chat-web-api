import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
