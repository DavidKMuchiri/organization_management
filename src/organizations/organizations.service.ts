import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from './dtos/organization.dto';
@Injectable()
export class OrganizationsService {
    constructor(@InjectModel('Organization') private readonly organizationModel: Model<Organization>){}

    async createOrganization(body: Organization) : Promise<string>{
        const existingOrganization = await this.organizationModel.findOne({$or: [
              { name: body.name },
              { emailL: body.email },
            ],
          })
        
        if(existingOrganization){
            throw new HttpException("Organization already exists", HttpStatus.BAD_REQUEST)
        }
        const newOrganization = new this.organizationModel(body)
        const result = await newOrganization.save(); 

        return result.id as string;
    }

    async getAllOrganizations() : Promise<Organization[]>{
        const allOrganizations = this.organizationModel.find();

        return allOrganizations;
    }

    async removeCompany(organizationId : string, companyId : string) : Promise<void>{
        await this.organizationModel.findByIdAndUpdate(
            organizationId,
            { $pull: { companies: companyId } },
            { new: true },
          );
    }

    async deleteOrganization(organizationId: string) : Promise<{}>{
        const organizationInfo = await this.getOrganizationById(organizationId);
        let results : {};
        if(organizationInfo){
            if(organizationInfo.companies.length > 0){
                throw new HttpException("Organization has existing companies", HttpStatus.BAD_REQUEST);
            }else{
                results = await this.organizationModel.findByIdAndDelete(organizationId);
            }
        }

        return results;
    }

    async updateOrganization(organizationId: string, body: Organization)  : Promise<Organization>{
        const organizationInfo = await this.getOrganizationById(organizationId);
        let results: Organization
        if(organizationInfo){
            results = await this.organizationModel.findByIdAndUpdate(organizationId, body, {new: true})
        }

        return results;
        
    }

    async getOrganizationById(id: string) : Promise<Organization>{
        let organization : Organization;
        try {
            organization = await this.organizationModel.findById(id);
        } catch (error) {
            throw new HttpException("No such organization",  HttpStatus.NOT_FOUND);
            
        }

        if(!organization){
            throw new HttpException("No such organization",  HttpStatus.NOT_FOUND);
        }else{
            return organization;
        }
    }

    async addCompany(organizationId : string, companyId : string) : Promise<void> {
        await this.organizationModel.findByIdAndUpdate(
            organizationId,
            { $push: { companies: companyId } },
            { new: true },
          );
    }
}
