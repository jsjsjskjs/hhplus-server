import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Type,
  UseGuards,
} from "@nestjs/common"

import { ApiBearerAuth } from "@nestjs/swagger"
import { SessionIdGuard } from "@root/auth/auth.guard"

export function Auth(authGuard: Type<CanActivate>) {
  return applyDecorators(UseGuards(authGuard), ApiBearerAuth("access-token"))
}

export function AuthAndSession(
  authGuard: Type<CanActivate>,
  SessionIdGuard: Type<CanActivate>,
) {
  return applyDecorators(
    UseGuards(authGuard, SessionIdGuard),
    ApiBearerAuth("access-token"),
  )
}

export function AuthAndParti(
  authGuard: Type<CanActivate>,
  partiGuard: Type<CanActivate>,
) {
  return applyDecorators(
    UseGuards(authGuard, partiGuard),
    ApiBearerAuth("access-token"),
    ApiBearerAuth("participation-token"),
  )
}

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export const AuthSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.sessionId
  },
)

export const AuthParti = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.participation
})
