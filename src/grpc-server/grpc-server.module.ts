import { Module } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcServerController } from './grpc-server.controller';

@Module({
  controllers: [GrpcServerController],
  providers: [GrpcServerService],
})
export class GrpcServerModule {}
