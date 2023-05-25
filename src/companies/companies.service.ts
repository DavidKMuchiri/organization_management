import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './dtos/company.dto';
import { OrganizationsService } from 'src/organizations/organizations.service';

@Injectable()
export class CompaniesService {
    constructor(@InjectModel('Company') private readonly companyModel: Model<Company>, private readonly organizationService: OrganizationsService){}

    async createCompany(body: Company) : Promise<string>{
        const existingCompany = await this.companyModel.findOne({$or: [
            { name: body.name },
            { email: body.email },
          ],
        })
      
      if(existingCompany){
          throw new HttpException("Company already exists", HttpStatus.BAD_REQUEST)
      }

        if(await this.organizationService.getOrganizationById(body.organizationId)){
            const newCompany = new this.companyModel(body);
            const results = await  newCompany.save()
            await this.organizationService.addCompany(body.organizationId, results.id)
            return results.id as string;
        }else{
            throw new HttpException("Error in company creation", HttpStatus.BAD_REQUEST);
        }
        // 
    }

    async getAllCompanies() : Promise<Company[]>{
        const allCompanies = await this.companyModel.find()

        return allCompanies;
    }

    async deleteCompany(companyId: string) : Promise<{}>{
        const companyInfo = await this.getCompanyById(companyId);
        let results : {};
        if(companyInfo){
            if(companyInfo.employees.length > 0){
                throw new HttpException("Company has existing employees", HttpStatus.BAD_REQUEST);
            }else{
                await this.organizationService.removeCompany(companyInfo.organizationId, companyId)
                results = await this.companyModel.findByIdAndDelete(companyId);
            }
        }

        return results;
    }
    async updateCompany(companyId: string, body: Company)  : Promise<Company>{
        const companyInfo = await this.getCompanyById(companyId);
        let results: Company
        if(companyInfo){
            results = await this.companyModel.findByIdAndUpdate(companyId, body, {new: true})
        }

        return results;
        
    }

    async removeEmployee(companyId : string, employeeId : string) : Promise<void>{
        await this.companyModel.findByIdAndUpdate(
            companyId,
            { $pull: { employees: employeeId } },
            { new: true },
          );
    }

    async getCompanyById(id: string) : Promise<Company>{
        let company : Company;
        try {
            company = await this.companyModel.findById(id);
        } catch (error) {
            throw new HttpException("No such company",  HttpStatus.NOT_FOUND);
            
        }

        if(!company){
            throw new HttpException("No such company",  HttpStatus.NOT_FOUND);
        }else{
            return company;
        }
    }

    async addEmployee(companyId : string, employeeId : string) : Promise<void> {
        await this.companyModel.findByIdAndUpdate(
            companyId,
            { $push: { employees: employeeId } },
            { new: true },
          );
    }
}

