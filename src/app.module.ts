import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { PasswordService } from './services/password/password.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.NAMEUSERDATABASE}:${process.env.PASSWORDDATABASE}@stengclusterblog.vgezi.mongodb.net/broers`,
    ),
    UsersModule,
  ],
  providers: [PasswordService],
})
export class AppModule {}