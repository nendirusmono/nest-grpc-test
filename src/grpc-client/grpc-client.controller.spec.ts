import { Test, TestingModule } from '@nestjs/testing';
import { GrpcClientController } from './grpc-client.controller';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

describe('GrpcClientController', () => {
  let controller: GrpcClientController;

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
      controllers: [GrpcClientController],
      providers: [GrpcClientService],
    }).compile();

    controller = module.get<GrpcClientController>(GrpcClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
