import { Test, TestingModule } from '@nestjs/testing';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

describe('GrpcClientService', () => {
  let service: GrpcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: `HERO_PACKAGE`,
            transport: Transport.GRPC,
            options: {
              package: [`hero`],
              protoPath: [join(__dirname, '../app.proto')],
              url: 'localhost:3303',
            },
          },
        ]),
      ],
      providers: [GrpcClientService],
    }).compile();

    service = module.get<GrpcClientService>(GrpcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
