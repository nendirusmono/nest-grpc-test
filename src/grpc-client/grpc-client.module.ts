import { Module } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';
import { GrpcClientController } from './grpc-client.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
console.log('dir', __dirname);
@Module({
  imports: [
    ClientsModule.register([
      {
        name: `HERO_PACKAGE`,
        transport: Transport.GRPC,
        options: {
          package: [`hero`],
          protoPath: [join(__dirname, './app.proto')],
          url: 'localhost:3303',
        },
      },
    ]),
  ],
  controllers: [GrpcClientController],
  providers: [GrpcClientService],
})
export class GrpcClientModule {}
