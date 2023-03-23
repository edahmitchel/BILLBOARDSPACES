import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(
    process.env.MONGOURI,
  ), UserModule, AuthModule


  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule { }
