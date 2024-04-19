import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServerController } from './grpc-server.controller';
import { GrpcServerService } from './grpc-server.service';

describe('GrpcServerController', () => {
  let controller: GrpcServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrpcServerController],
      providers: [GrpcServerService],
    }).compile();

    controller = module.get<GrpcServerController>(GrpcServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
