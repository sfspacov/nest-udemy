import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsModule } from './contacts/contacts.module';
import { enableCors } from './cors.middleware';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, enableCors)
      //.forRoutes(ContactsController);
      .forRoutes(
        { path: 'contacts', method: RequestMethod.POST },
        { path: 'contacts/*', method: RequestMethod.PUT },
        { path: 'contacts/*', method: RequestMethod.PATCH },
      )
  }
}