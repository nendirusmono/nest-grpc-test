import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export interface HeroService {
  FindOne(data: HeroById, metadata: Metadata): Observable<HeroGrpcResponse>;

  FindMany(
    data: GrpcEmptyRequest,
    metadata: Metadata,
  ): Observable<HeroesGrpcResponse>;
}

export interface GrpcBaseResponse {
  code: number;
  message: string;
}

export interface HeroGrpcResponse extends GrpcBaseResponse {
  data?: Hero;
}

export interface HeroesGrpcResponse extends GrpcBaseResponse {
  data?: Hero[];
}

export interface Hero {
  id: string;
  name: string;
  strength: number;
}

export interface HeroById {
  id: string;
}

export interface GrpcEmptyRequest {}
