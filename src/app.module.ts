import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from './companies/companies.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { config } from 'dotenv';
config()

@Module({
  imports: [OrganizationsModule, MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING), CompaniesModule, EmployeesModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
