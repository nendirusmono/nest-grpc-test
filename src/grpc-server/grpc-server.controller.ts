import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { GrpcServerService } from './grpc-server.service';
import { CreateGrpcServerDto } from './dto/create-grpc-server.dto';
import { UpdateGrpcServerDto } from './dto/update-grpc-server.dto';
import { HeroById } from './grpc-server.interface';

@Controller()
export class GrpcServerController {
  constructor(private readonly grpcServerService: GrpcServerService) {}

  @MessagePattern('createGrpcServer')
  create(@Payload() createGrpcServerDto: CreateGrpcServerDto) {
    return this.grpcServerService.create(createGrpcServerDto);
  }

  @GrpcMethod('HeroService', 'FindMany')
  findAll() {
    return this.grpcServerService.findAll();
  }

  @GrpcMethod('HeroService', 'FindOne')
  findOne(@Payload() { id }: HeroById) {
    console.log('grpc serv Findone', id);
    return this.grpcServerService.findOne(id);
  }

  @MessagePattern('updateGrpcServer')
  update(@Payload() { id, data }: UpdateGrpcServerDto) {
    return this.grpcServerService.update(id, data);
  }

  @MessagePattern('removeGrpcServer')
  remove(@Payload() id: number) {
    return this.grpcServerService.remove(id);
  }
}
