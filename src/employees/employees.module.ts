import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schemas/employees.schema';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Employee', schema: EmployeeSchema}]), CompaniesModule],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
