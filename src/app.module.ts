import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcClientModule } from './grpc-client/grpc-client.module';
import { GrpcServerModule } from './grpc-server/grpc-server.module';

@Module({
  imports: [GrpcClientModule, GrpcServerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
