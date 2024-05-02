import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServerController } from './grpc-server.controller';
import { GrpcServerService } from './grpc-server.service';
import { PrismaService } from '../prisma.service';

describe('GrpcServerController', () => {
  let controller: GrpcServerController;
  let service: GrpcServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcServerController],
      providers: [GrpcServerService, PrismaService],
    }).compile();

    controller = module.get<GrpcServerController>(GrpcServerController);
    service = module.get<GrpcServerService>(GrpcServerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of heroes', async () => {
      const result = { data: [{ id: '123', name: 'name', strength: 1202 }] };
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });
  describe('findOne', () => {
    it('should return a hero', async () => {
      const result = { data: { id: '123', name: 'name', strength: 1202 } };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne({ id: 'abcd' })).toBe(result);
    });
  });
});
