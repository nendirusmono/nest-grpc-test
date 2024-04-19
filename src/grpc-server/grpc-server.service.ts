import { Injectable } from '@nestjs/common';
import { CreateGrpcServerDto } from './dto/create-grpc-server.dto';
import { UpdateGrpcServerDto } from './dto/update-grpc-server.dto';

@Injectable()
export class GrpcServerService {
  create(dto: CreateGrpcServerDto) {
    console.log('create', dto);
    return 'This action adds a new grpcServer';
  }

  findAll() {
    return { data: [{ id: '123', name: 'name', strength: 1202 }] };
  }

  findOne(id: string) {
    return { data: { id, name: 'name', strength: 1200 } };
  }

  update(id: number, dto: UpdateGrpcServerDto) {
    console.log('update', dto);
    return `This action updates a #${id} grpcServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} grpcServer`;
  }
}
