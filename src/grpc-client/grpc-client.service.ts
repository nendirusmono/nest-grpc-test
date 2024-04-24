import { Inject, Injectable } from '@nestjs/common';
import { CreateGrpcClientDto } from './dto/create-grpc-client.dto';
import { UpdateGrpcClientDto } from './dto/update-grpc-client.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { HeroService } from 'src/grpc-server/grpc-server.interface';
import { Metadata } from '@grpc/grpc-js';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GrpcClientService {
  private hero_grpc: HeroService;
  constructor(@Inject(`HERO_PACKAGE`) private client: ClientGrpc) {}
  onModuleInit() {
    this.hero_grpc = this.client.getService<HeroService>(`HeroService`);
  }

  create(dto: CreateGrpcClientDto) {
    console.log('create hero via grpc', dto);
    return 'This action adds a new grpcClient';
  }

  async findAll() {
    const meta = new Metadata();
    const rsl = await lastValueFrom(this.hero_grpc.FindMany({}, meta));
    return rsl.data;
  }

  async findOne(id: string) {
    const meta = new Metadata();
    const rsl = await lastValueFrom(this.hero_grpc.FindOne({ id }, meta));
    return rsl.data;
  }

  update(id: number, dto: UpdateGrpcClientDto) {
    console.log('update hero via grpc', dto);
    return `This action updates a #${id} grpcClient`;
  }

  remove(id: number) {
    return `This action removes a #${id} grpcClient`;
  }
}
