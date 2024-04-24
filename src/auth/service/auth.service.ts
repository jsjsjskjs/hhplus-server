import { forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { ClientService } from "@root/client/service/client.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ClientService))
    private clientService: ClientService,
    private jwtSevice: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const client = await this.clientService.findOneByEmail(email)
    if (client.password !== password) {
      console.log("check")
      throw new UnauthorizedException("Invalid email or password")
    }
    const payload = { sub: client.id, email: client.email }
    return {
      access_token: await this.jwtSevice.signAsync(payload, { expiresIn: "1d" }),
    }
  }

  async getParticipantToken(concertDatesId: string, sessionId: string) {
    const payload = { concertDatesId, sessionId }
    return {
      participant_token: await this.jwtSevice.signAsync(payload, { expiresIn: "7m" }),
    }
  }
}
