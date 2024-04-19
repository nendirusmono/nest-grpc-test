import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';
import { CreateGrpcClientDto } from './dto/create-grpc-client.dto';
import { UpdateGrpcClientDto } from './dto/update-grpc-client.dto';

@Controller('grpc-client')
export class GrpcClientController {
  constructor(private readonly grpcClientService: GrpcClientService) {}

  @Post()
  create(@Body() createGrpcClientDto: CreateGrpcClientDto) {
    return this.grpcClientService.create(createGrpcClientDto);
  }

  @Get()
  findAll() {
    return this.grpcClientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grpcClientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGrpcClientDto) {
    return this.grpcClientService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grpcClientService.remove(+id);
  }
}
