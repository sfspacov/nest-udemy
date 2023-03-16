import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyCustomExceptionFilter } from './my-custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Apply exception filter globally
  //app.useGlobalFilters(new MyCustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
