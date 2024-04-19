import { Test } from '@nestjs/testing';
import { GrpcServerModule } from './grpc-server.module';

describe('GrpcServerModule', () => {
  it('should compile grpc-server module', async () => {
    const module = await Test.createTestingModule({
      imports: [GrpcServerModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
