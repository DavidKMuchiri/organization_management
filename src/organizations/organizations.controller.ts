import { Controller, Post, Body, UsePipes, ValidationPipe, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Organization } from './dtos/organization.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationsController {
    constructor(private readonly organizationService: OrganizationsService){}
    
    @Get('')
    allOrganizations() : Promise<Organization[]>{
        const allOrganizations = this.organizationService.getAllOrganizations();

        return allOrganizations;
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    async addOrganization(@Body() organzationDetails: Organization) : Promise<{id: string}>{
        const generatedId = await this.organizationService.createOrganization(organzationDetails);

        return {id: generatedId};
    }

    @Get(':id')
    async getOneOrganization(@Param('id') organizationId: string) : Promise<Organization>{
        const organization = await this.organizationService.getOrganizationById(organizationId)
        return  organization;
    }

    @Delete('delete/:id')
    async deleteOrganization(@Param('id') organizationId: string) : Promise<{}>{
        const results = await this.organizationService.deleteOrganization(organizationId);

        return results;
    }

    @Put('update/:id')
    async editOrganization(@Body() changes: Organization, @Param('id') organizationId: string) : Promise<Organization>{
        const results = await this.organizationService.updateOrganization(organizationId, changes);

        return results;
    }
}
