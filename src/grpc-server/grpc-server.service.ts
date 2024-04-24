import { Injectable } from '@nestjs/common';
import { CreateGrpcServerDto } from './dto/create-grpc-server.dto';
import { UpdateGrpcServerDto } from './dto/update-grpc-server.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GrpcServerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGrpcServerDto) {
    const rsl = await this.prisma.hero.create({ data: dto });
    return rsl;
  }

  async findAll() {
    const data = await this.prisma.hero.findMany();
    return { data };
  }

  async findOne(id: string) {
    const data = await this.prisma.hero.findUniqueOrThrow({ where: { id } });
    return { data };
  }

  update(id: number, dto: UpdateGrpcServerDto) {
    console.log('update', dto);
    return `This action updates a #${id} grpcServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} grpcServer`;
  }
}
