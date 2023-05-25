import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { MongooseModule } from '@nestjs/mongoose'
import { CompanySchema } from './schemas/companies.schema';
import { OrganizationsModule } from 'src/organizations/organizations.module';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Company', schema: CompanySchema}]), OrganizationsModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
