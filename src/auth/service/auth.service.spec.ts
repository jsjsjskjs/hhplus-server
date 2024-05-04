import { AuthService } from "./auth.service"
import { ClientService } from "../../client/service/client.service"
import { BaseClientRepository } from "@root/client/repository/client.repository.abstract"
import { JwtService } from "@nestjs/jwt"
import { UnauthorizedException } from "@nestjs/common"

describe("AuthService", () => {
  let authService: AuthService
  let mockJwtService: Partial<JwtService>
  let mockClientService: Partial<ClientService>
  let mockIClientRepo: Partial<BaseClientRepository>

  beforeEach(async () => {
    mockIClientRepo = {
      findOneByEmail: jest
        .fn()
        .mockResolvedValue({ id: "abc123", email: "test@example.com", password: "1234" }),
    }
    mockJwtService = {
      signAsync: jest.fn().mockResolvedValue("token"),
    }
    mockClientService = {
      findOneByEmail: mockIClientRepo.findOneByEmail,
    }
    authService = new AuthService(
      mockClientService as ClientService,
      mockJwtService as JwtService,
    )
  })

  it("로그인에 성공하면 토큰을 받습니다", async () => {
    const result = await authService.signIn("test@example.com", "1234")
    expect(result.access_token).toEqual("token")
  })

  it("로그인에 실패하면 에러를 반환합니다", async () => {
    try {
      mockClientService.findOneByEmail = jest
        .fn()
        .mockResolvedValue({ id: "abc123", email: "test@example.com", password: "1234" })
      await authService.signIn("test@example.com", "12345")
    } catch (e) {
      expect(e.message).toEqual("Invalid email or password")
      expect(e).toBeInstanceOf(UnauthorizedException)
    }
  })
})
