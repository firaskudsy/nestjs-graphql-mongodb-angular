import { EventModule } from './src/event/event.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './src/user/user.module';

import { GraphQLModule } from '@nestjs/graphql';
import { IsAuthMiddleware } from './src/token/isAuth.middleware';
import { HallModule } from './src/hall/hall.module';
import { HallService } from './src/hall/hall.service';
import { EventService } from './src/event/event.service';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';
@Module({
  // providers: [HallService],
  // exports: [HallService],
  imports: [
    HallModule,
    ServerModule,
    ServerTransferStateModule,
    EventModule,
    UserModule,
    GraphQLModule.forRoot({

      autoSchemaFile: 'schema.gql',
      context: ({ req }) => {
        return {
          request: req,
        };
      },
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    // AngularUniversalModule.forRoot({
    //   viewsPath: join(process.cwd(), 'dist/browser'),
    //   bundle: require('../server/main'),
    //   liveReload: true,

    // })
  ]
})

export class ApplicationModule { }
// export class ApplicationModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(IsAuthMiddleware)
//       .forRoutes('graphql');
//   }
// }
