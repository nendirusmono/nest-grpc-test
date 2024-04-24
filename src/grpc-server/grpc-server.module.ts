import { Module } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcServerController } from './grpc-server.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [GrpcServerController],
  providers: [GrpcServerService, PrismaService],
})
export class GrpcServerModule {}
