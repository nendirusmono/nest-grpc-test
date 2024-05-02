import { Test, TestingModule } from '@nestjs/testing';
import { GrpcClientService } from './grpc-client.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

describe('GrpcClientService', () => {
  let module: TestingModule;
  let service: GrpcClientService;
  let server: Server;
  const protoPath = join(process.cwd(), 'src/app.proto');
  const packageDefinition = protoLoader.loadSync(protoPath);
  const hero_proto = loadPackageDefinition(packageDefinition).hero as any;

  beforeEach(async () => {
    server = new Server({
      package: 'hero',
      protoPath,
      url: 'localhost:3303',
    });

    module = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: `HERO_PACKAGE`,
            transport: Transport.GRPC,
            options: {
              package: [`hero`],
              protoPath: [protoPath],
              url: 'localhost:3303',
            },
          },
        ]),
      ],
      providers: [GrpcClientService],
    }).compile();
    await module.init();

    service = module.get<GrpcClientService>(GrpcClientService);
    server.bindAsync(
      '0.0.0.0:3303',
      ServerCredentials.createInsecure(),
      (err, port) => {
        console.log(`gRPC listening on ${port}`);
      },
    );
  });

  afterEach(async function () {
    await module.close();
    await server.forceShutdown();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of heroes', async () => {
      const result = [{ id: '123', name: 'name', strength: 1202 }];
      server.addService(hero_proto.HeroService.service, {
        FindMany(call, callback) {
          callback(null, { data: result });
        },
      });

      const rsl = await service.findAll();
      console.log('findOne', typeof rsl, typeof result);
      expect(rsl[0]).toHaveProperty('id');
    });
  });
  describe('findOne', () => {
    it('should return an object of hero', async () => {
      const result = { id: '123', name: 'name', strength: 1202 };
      server.addService(hero_proto.HeroService.service, {
        FindOne(call, callback) {
          callback(null, { data: result });
        },
      });

      expect(await service.findOne('1')).toHaveProperty('name');
    });
  });
});
