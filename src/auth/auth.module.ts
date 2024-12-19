import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports : [
    PassportModule.register({
      defaultStrategy: ['jwt-access' , 'jwt-refresh'],
    }),
    JwtModule.register({}),
  ],
  providers: [AuthService , JwtStrategy , JwtRefreshStrategy ,  RolesGuard],
  exports : [JwtStrategy , JwtRefreshStrategy , PassportModule , RolesGuard , JwtModule , AuthService]
})
export class AuthModule {}