import { Controller, UsePipes, ValidationPipe, Body, Post, Get, Param, Delete, Put, UseGuards} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './dtos/company.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('companies')
@UseGuards(AuthGuard)
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService){}

    @Get('')
    async allCompanies() : Promise<Company[]>{
        const companies = await this.companiesService.getAllCompanies();

        return companies;
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    async addCompany(@Body() companyDetails: Company) : Promise<{id: string}>{
        const generatedId = await this.companiesService.createCompany(companyDetails)

        return {id: generatedId};
    }

    @Get(':id')
    async getOneCompany(@Param('id') companyId: string) : Promise<Company>{
        const company = await this.companiesService.getCompanyById(companyId);

        return company;
    }

    @Delete('delete/:id')
    async deleteCompany(@Param('id') companyId: string) : Promise<{}>{
        const results = await this.companiesService.deleteCompany(companyId);

        return results;
    }

    @Put('update/:id')
    async editCompany(@Body() changes: Company, @Param('id') companyId: string) : Promise<Company>{
        const results = await this.companiesService.updateCompany(companyId, changes);

        return results;
    }

}
