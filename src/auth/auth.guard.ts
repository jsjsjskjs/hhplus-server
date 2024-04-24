import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { jwtConstants } from "@root/shared/constant/auth"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      console.log("here?")
      throw new UnauthorizedException("Unauthorized")
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })
      request["user"] = payload
    } catch (e) {
      console.error(e)
      throw new UnauthorizedException("Unauthorized")
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers["authorization"] as string | undefined
    if (!authHeader) return undefined
    const [type, token] = authHeader.split(" ")
    return type === "Bearer" ? token : undefined
  }
}

@Injectable()
export class SessionIdGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const sessionId = this.extractTokenFromHeader(request)
    if (!sessionId) {
      console.log("here?")
      throw new UnauthorizedException("Unauthorized")
    }
    try {
      request["sessionId"] = sessionId
    } catch (e) {
      console.error(e)
      throw new UnauthorizedException("Unauthorized")
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers["booking-session-id"] as string | undefined
    if (!authHeader) return undefined
    return authHeader
  }
}

@Injectable()
export class ParticipationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      console.log("here?")
      throw new UnauthorizedException("Unauthorized")
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      })
      request["participation"] = payload
    } catch (e) {
      console.error(e)
      throw new UnauthorizedException("Unauthorized")
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers["participation-token"] as string | undefined
    if (!authHeader) return undefined
    const [type, token] = authHeader.split(" ")
    return type === "Bearer" ? token : undefined
  }
}
