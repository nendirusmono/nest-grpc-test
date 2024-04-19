import { Test } from '@nestjs/testing';
import { GrpcClientModule } from './grpc-client.module';

describe('GrpcClientModule', () => {
  it('should compile grpc-client module', async () => {
    const module = await Test.createTestingModule({
      imports: [GrpcClientModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
