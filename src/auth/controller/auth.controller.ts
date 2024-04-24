import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from "@root/auth/service/auth.service"
import { LoginDto } from "@root/auth/dto/auth.dto"

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password)
  }
}
