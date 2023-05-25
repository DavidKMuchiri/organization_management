import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { MongooseModule } from '@nestjs/mongoose'
import { OrganizationSchema } from './schemas/organization.schema';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ MongooseModule.forFeature([{name: 'Organization', schema: OrganizationSchema}]) ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService]
})
export class OrganizationsModule {}
