import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServerService } from './grpc-server.service';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('GrpcServerService', () => {
  let service: GrpcServerService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrpcServerService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<GrpcServerService>(GrpcServerService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should returns heroes', () => {
    const heroes = [];

    prisma.hero.findMany.mockResolvedValueOnce(heroes);

    expect(service.findAll()).resolves.toBe(heroes);
  });
});
