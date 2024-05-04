import { Test, TestingModule } from "@nestjs/testing"
import { ClientService } from "./client.service"
import { RedisService } from "@root/redis/redis.service"
import { ConcertDatesService } from "@root/concert/service/concert-dates.service"
import { BaseClientRepository } from "@root/client/repository/client.repository.abstract"
import { AuthService } from "@root/auth/service/auth.service"
import { DataSource, EntityManager, Repository } from "typeorm"
import { UnauthorizedException } from "@nestjs/common"

describe("ClientService", () => {
  let clientService: ClientService
  let mockRedisService: Partial<RedisService>
  let mockConcertDatesService: Partial<ConcertDatesService>
  let mockClientRepo: Partial<BaseClientRepository>
  let mockAuthService: Partial<AuthService>
  let mockDataSource: Partial<DataSource>
  let mockEntityManager: Partial<EntityManager>

  beforeEach(async () => {
    // Mock setup
    mockClientRepo = {
      findOneByEmail: jest
        .fn()
        .mockResolvedValue({ id: "1", email: "test@example.com", password: "password" }),
      findOneById: jest.fn().mockResolvedValue({ id: "1", name: "John Doe" }),
      addPoint: jest.fn(),
      usePoint: jest.fn(),
    }
    mockRedisService = {
      addToReadyQueue: jest.fn(),
      addToParticipantQueue: jest.fn(),
      removeFromReadyQueue: jest.fn(),
      getMyReadyRank: jest.fn().mockResolvedValue(1),
      getPartiQueueSize: jest.fn().mockResolvedValue(10),
      removeExpiredParticipants: jest.fn().mockResolvedValue(1),
    }
    mockConcertDatesService = {
      findOneById: jest.fn().mockResolvedValue({ id: "123", date: new Date() }),
    }
    mockAuthService = {
      getParticipantToken: jest.fn().mockResolvedValue({ participant_token: "token123" }),
    }
    mockDataSource = {
      transaction: jest
        .fn()
        .mockImplementation((transactionCallback) =>
          transactionCallback(mockEntityManager),
        ),
    }
    mockEntityManager = {}

    clientService = new ClientService(
      mockClientRepo as BaseClientRepository,
      mockRedisService as RedisService,
      mockConcertDatesService as ConcertDatesService,
      mockDataSource as DataSource,
      mockAuthService as AuthService,
    )
  })

  it("should throw UnauthorizedException if client does not exist for email", async () => {
    jest.spyOn(mockClientRepo, "findOneByEmail").mockResolvedValueOnce(null)
    await expect(
      clientService.enterEntries("wrong@example.com", "session123", {
        concertDatesId: "date123",
      }),
    ).rejects.toThrow(UnauthorizedException)
  })

  it("should successfully add client to ready queue", async () => {
    await clientService.enterEntries("test@example.com", "session123", {
      concertDatesId: "date123",
    })
    expect(mockRedisService.addToReadyQueue).toHaveBeenCalledWith(
      "123",
      "session123",
      expect.any(Number),
    )
  })

  it("should enter participant and return attending status", async () => {
    const result = await clientService.enterParticipant("session123", "date123", 1)
    expect(result).toEqual({
      type: "ATTENDING",
      nowNumber: 1,
      token: "token123",
    })
    expect(mockAuthService.getParticipantToken).toHaveBeenCalled()
    expect(mockRedisService.addToParticipantQueue).toHaveBeenCalledWith(
      "date123",
      "session123",
      expect.any(Number),
    )
  })

  it("should handle getEntries logic correctly", async () => {
    const result = await clientService.getEntries(
      "test@example.com",
      "session123",
      "date123",
    )
    expect(result).toEqual({
      type: "ATTENDING",
      nowNumber: 1,
      token: "token123",
    })
  })
})
