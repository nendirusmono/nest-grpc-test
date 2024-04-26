import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServerService } from './grpc-server.service';
import { PrismaService } from '../prisma.service';

describe('GrpcServerService', () => {
  let service: GrpcServerService;

  let findUniqueMock: jest.Mock;
  let findManyMock: jest.Mock;

  beforeEach(async () => {
    findUniqueMock = jest.fn();
    findManyMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrpcServerService,
        {
          provide: PrismaService,
          useValue: {
            hero: {
              findUniqueOrThrow: findUniqueMock,
              findMany: findManyMock,
            },
          },
        },
      ],
    }).compile();

    service = module.get<GrpcServerService>(GrpcServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('hero findAll', () => {
    const heroes = [];
    it('should returns heroes', () => {
      findManyMock.mockResolvedValue(heroes);

      expect(service.findAll()).resolves.toHaveProperty('data', heroes);
    });
  });
  describe('hero findOne', () => {
    const hero = { id: 'abcd', name: 'efgh', strength: 123 };
    it('should returns a hero', () => {
      findUniqueMock.mockResolvedValue(hero);

      expect(service.findOne('qwerty')).resolves.toHaveProperty('data', hero);
    });
  });
});
