import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

describe('AppModule', () => {
  it('should compile app module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
    // expect(module.get(AppController)).toBeInstanceOf(AppController);
    // expect(module.get(AppService)).toBeInstanceOf(AppService);
  });
});
