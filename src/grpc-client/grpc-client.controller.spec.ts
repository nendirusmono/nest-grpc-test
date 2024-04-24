import { Test, TestingModule } from '@nestjs/testing';
import { GrpcClientController } from './grpc-client.controller';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

describe('GrpcClientController', () => {
  let controller: GrpcClientController;
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
              protoPath: [join(process.cwd(), 'src/app.proto')],
              url: 'localhost:3303',
            },
          },
        ]),
      ],
      controllers: [GrpcClientController],
      providers: [GrpcClientService],
    }).compile();

    controller = module.get<GrpcClientController>(GrpcClientController);
    service = module.get<GrpcClientService>(GrpcClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [{ id: '123', name: 'name', strength: 1202 }];
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });
  describe('findOne', () => {
    it('should return an array of cats', async () => {
      const result = { id: '123', name: 'name', strength: 1202 };
      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findOne('1')).toBe(result);
    });
  });
});
