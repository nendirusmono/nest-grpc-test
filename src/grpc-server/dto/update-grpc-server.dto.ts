import { PartialType } from '@nestjs/mapped-types';
import { CreateGrpcServerDto } from './create-grpc-server.dto';

export class UpdateGrpcServerDto extends PartialType(CreateGrpcServerDto) {
  id: number;
  data: any;
}
