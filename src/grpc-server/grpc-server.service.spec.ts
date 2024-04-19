import { Test, TestingModule } from '@nestjs/testing';
import { GrpcServerService } from './grpc-server.service';

describe('GrpcServerService', () => {
  let service: GrpcServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrpcServerService],
    }).compile();

    service = module.get<GrpcServerService>(GrpcServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
