import { forwardRef, Module } from "@nestjs/common"
import { AuthService } from "./service/auth.service"
import { ClientModule } from "@root/client/client.module"
import { JwtModule } from "@nestjs/jwt"
import { AuthController } from "./controller/auth.controller"
import { jwtConstants } from "@root/shared/constant/auth"

@Module({
  imports: [
    forwardRef(() => ClientModule),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "30m" },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
